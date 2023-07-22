const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const mysql = require('mysql2/promise');
let connection;
async function connectToDatabase() {
  try {
      connection = await mysql.createConnection({
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
    });

    // اجرای کوئری‌ها و سایر عملیات‌ها

    await connection.query('SELECT 1');
    return connection; // بازگرداندن اتصال به عنوان نتیجه
  } catch (error) {
    console.error(error);
    throw error; // انتقال خطا به بالاترین سطح
  }
}
connectToDatabase();
const connectionPromise = connectToDatabase()
// تعریف استراتژی Local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const connection = await connectionPromise; // انتظار برای بدست آوردن اتصال

      // جستجوی کاربر بر اساس نام کاربری
      const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
      const user = rows[0];

      // بررسی وجود کاربر و صحت رمز عبور
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'نام کاربری یا رمز عبور اشتباه است.' });
      }

      // احراز هویت موفقیت آمیز
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// ثبت کاربر در session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// دریافت کاربر از session
passport.deserializeUser(async (id, done) => {
  try {
    const connection = await connectionPromise; // انتظار برای بدست آوردن اتصال

    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
