'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ارسال درخواست ورود به سمت سرور
    fetch('http://localhost:8081/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password  }),
    })
      .then((response) => response.json())
      .then((data) => {
        // پردازش واکنش از سمت سرور
        console.log(data);
        const Token = data.token;
        localStorage.setItem("user" , Token);
        var Nuler = data.Loggedin['message'];
        console.log(Nuler)
        if(Nuler != null){
          router.push('/pages/gpt');
          console.log("bo")
       }  
          const EmailEr = data.errors[0];
          const PassEr = data.errors[1] ;
          if(EmailEr != null){
          alert(EmailEr.msg)
           }
          if(PassEr != null){
            alert(PassEr.msg)
          }
              
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="w-64 p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold text-center mb-4">ورود</h1>
        <input
          type="text"
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
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          ورود
        </button>
      </form>
    </div>
    
  );
 
}
