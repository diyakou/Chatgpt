'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone , setPhone] = useState('');

  const router = useRouter();
  var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    var result = regex.test(phone);
     if(result == true){
    // ارسال درخواست ورود به سمت سرور
    fetch('http://localhost:8081/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        // پردازش واکنش از سمت سرور
        console.log(data);
        const user = data.token;
        localStorage.setItem('user', user);
        router.push('/pages/gpt'); // هدایت به صفحه /pages/gpt
      })
      .catch((error) => {
        console.error(error);
      });}
      else{
        var error = document.getElementById("error");
        error.innerHTML = "<span style='color: red;'>"+
                        "Please enter a valid number</span>"

      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="w-64 p-4 bg-white rounded shadow" name='RegForm'>
        <h1 className="text-2xl font-semibold text-center mb-4">ثبت نام</h1>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />

        <input
          type="text"
          placeholder="شماره همراه"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <div id='error'>

        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 click"
        >
          ورود
        </button>
      </form>
    </div>
  );
}