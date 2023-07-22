const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path : '../.env'});
const DbUrl =  process.env.MONGO_URI;

function connect() {
 const connectdb = mongoose.connect(DbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  connectdb.then(
  (db)=>{
      console.log("Connecting to db successful")
  },
  (err)=>{
       console.log(err)
  })
}
connect();