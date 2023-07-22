import React from "react";
import Image from "next/image";
import './index.css';
import About from "./pages/gpt/page";
// localhost:3000/
import App from "./pages/gpt/page";
import Navbar from "./pages/Navbar/navbar";
import Link from "next/link";
import Footer from './pages/footer/page.js'

const Home = () => {
  return (
    <div className="main">
      <Navbar />

      <div className="card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <div className="rounded-t-lg">
            <Image
              src="/mypic.jpg"
              alt={"مرتضی تقوی"}
              width={'600'}
              height={'800'}
              
            />
          </div>
        </a>

        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Hi my name is Morteza, I'm a fullStack developer
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            This is just my resume website where you can learn more about me
          </p>

          <div className="flex flex-col gap-2">
            <button className="btn bg-dark px-4 py-2 text-white bg-glass rounded-lg shadow-glass">
              <a href="https://instagram.com/dr_webiran">Instagram</a>
            </button>
            <button className="btn bg-dark px-4 py-2 text-white bg-glass rounded-lg shadow-glass">
              <a href="https://t.me/iammorvism">Telegram</a>
            </button>
            <button className="btn bg-dark px-4 py-2 text-white bg-glass rounded-lg shadow-glass">
              <a href="https://github.com/morvism">Github
              </a>
            </button>
            <button className="btn bg-primary px-4 py-2 text-white bg-glass rounded-lg shadow-glass">
              
            <a href="/pages/gpt"> Persian GPT  </a>
            </button>
          
          </div>
        </div>
      </div>
      <footer>
        <Footer />
        </footer>
    </div>
  );
};

export default Home;
