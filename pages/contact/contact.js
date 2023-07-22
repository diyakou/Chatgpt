'use client'
import React, { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./form.css";

export default function ContactUs() {
  const [status, setStatus] = useState("Submit");
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (token) {
      console.log(`hCaptcha Token: ${token}`);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    if (token != null || undefined) {
      let response = await fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Submit");
      let result = await response.json();
      alert(result.status);
    }
    if (token == null || undefined) {
      alert("Please complete Captcha");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500"
    >
      <h1 className="text-2xl font-bold dark:text-gray-50">Send a message</h1>

      <label
        htmlFor="name"
        className="text-gray-500 font-light mt-8 dark:text-gray-50"
      >
        Full name
        <span className="text-red-500 dark:text-gray-50">*</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
      />

      <label
        htmlFor="email"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        E-mail
        <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
      />

      <label
        htmlFor="subject"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        Subject
        <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
      />

      <label
        htmlFor="message"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        Message
        <span className="text-red-500">*</span>
      </label>
      <textarea
        name="message"
        className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
      ></textarea>

      <HCaptcha
        sitekey="hcaptcha-token"
        onLoad={onLoad}
        onVerify={setToken}
        ref={captchaRef}
      />

      <div className="flex flex-row items-center justify-start">
        <button
          type="submit"
          className="sumbit px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
        >
          {status}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-cyan-500 ml-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}