'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/navbar';
import Login from '../login/page';
import Link from 'next/link';
import './gpt.css';

function Gpt() {
  const [inputText, setInputText] = useState('');
  const [chatContent, setChatContent] = useState([]);
  const [AuthRes, setAuthRes] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    const totalInputText = inputText;

    // Add user input to the chat content
    const userMessage = { role: 'user', content: totalInputText };
    setChatContent((prevContent) => [...prevContent, userMessage]);

    fetch('http://localhost:8081/responseGPT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: totalInputText }),
    })
      .then((response) => response.text())
      .then((data) => {
        // Add assistant response to the chat content
        const assistantMessage = { role: 'assistant', content: data };
        setChatContent((prevContent) => [...prevContent, assistantMessage]);
      })
      .catch((error) => console.error(error));

    setInputText(''); // Clear the input field after sending
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    fetch('http://localhost:8081/user/me', {
      headers: {
        token: user,
      },
    })
      .then((response) => response.json())
      .then((data) => setAuthRes(data))
      .catch((error) => console.log(error));
  }, []);
  const getCodeOutputBlocks = (content) => {
    // Regular expression to detect code and output sections within the content
    const codeOutputRegex = /```([\s\S]*?)```([\s\S]*?)(?=(?:```|$))/gs;
    return content.match(codeOutputRegex) || [];
  };
   const handleCopyText = () => {
    const chatText = chatContent[chatContent.length - 1]?.content || '';
    navigator.clipboard.writeText(chatText);
  };

  const languageRegex = /(?:\b(?:javascript|python|java|c#|php)\b)/i;
  const detectedLanguage = inputText.match(languageRegex)?.[0] || 'Unknown Language';

  const isPersian = /[\u0600-\u06FF]/.test(chatContent[chatContent.length - 1]?.content || '');
  const isEnglish = /^[A-Za-z0-9]*$/.test(chatContent[chatContent.length - 1]?.content || '');


  if (AuthRes.username !== undefined) {
    return (
      <div className="main">
      <Navbar />

      <div className="bg-black h-screen flex items-center justify-center">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl text-center text-white mb-8">
            درخواست خود را کامل وارد کنید:
          </h1>
          <div className="mb-4">
            <textarea
              className={`w-full px-2 py-1 bg-gray-200 border border-gray-300 rounded ${
                isPersian ? 'rtl' : 'ltr'
              }`}
              rows="1"
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={handleSendClick}
          >
            Send
          </button>

          {chatContent.length > 0 && (
    <div className="mt-4">
      <h1 className="text-3xl text-center text-white mb-4">جواب شما:</h1>
      <div className="bg-gray-200 p-3">
        {detectedLanguage !== 'Unknown Language' && (
          <div className="mb-4">
            <span className="text-gray-600 font-semibold">
              زبان تشخیص داده شده:
            </span>{" "}
            {detectedLanguage}
          </div>
        )}

        {chatContent.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
            {getCodeOutputBlocks(message.content).length > 0 ? (
              // Render code and output blocks in separate boxes
              getCodeOutputBlocks(message.content).map((codeOutput, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-300 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                  style={{ direction: isPersian ? 'rtl' : 'ltr' }}
                >
                  {/* Add specific classes for code blocks and output */}
                  <pre className={message.role === 'user' ? 'code-block-user' : 'code-block-assistant'}>
                    {codeOutput}
                  </pre>
                </div>
              ))
            ) : (
              // Render normal text
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-300 text-white'
                    : 'bg-gray-300 text-black'
                }`}
                style={{ direction: isPersian ? 'rtl' : 'ltr' }}
              >
                {message.content}
              </div>
            )}
          </div>
        ))}

        <button
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2"
          onClick={handleCopyText}
        >
          کپی کردن متن
        </button>
      </div>
    </div>
  )}
        </div>
      </div>
    </div>
    );
  } else {
    return (
      <>
        {isOpen && (
          <div className="modals fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
              <button className="btn closebtn left-4" onClick={handleCloseModal}>
                <svg
                  className="w-4 h-4 text-gray-600 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <h2 className="text-lg font-medium">
                استفاده از این بخش نیازمند ورود می‌باشد
              </h2>
              <p className="text-gray-500 mt-2">
                جهت ورود و ثبت نام می‌توانید از دکمه‌ها استفاده کنید.
              </p>

              <div className="flex justify-end mt-4">
                <a href="/pages/login">
                  <button className="btn lgn">ورود</button>
                </a>
                <a href="/pages/register">
                  <button className="btn ml-2">ثبت نام</button>
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Gpt;
