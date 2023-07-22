import React from "react";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import ContactUs from "./contact.js";
import Navbar from "../Navbar/navbar";
import "./contact.css";

const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="body-fo bg-white dark:bg-slate-800 rounded-lg">
      <div className="cntr bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl grid gap-4 md:grid-cols-2 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="w-64 h-64 md:w-auto md:h-auto">
            <Image
              src="/char4.png"
              width="450"
              height="450"
              alt="Morteza Taghavi"
              className="image object-contain"
            />
          </div>
        </div>
        <div className="md:flex md:flex-col md:items-start">
          <div className="mb-4 md:mb-0">
            <ContactUs />
          </div>
          <div className="md:fixed md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2">
            <a href="https://t.me/iammorvism">
              <button className="btns-co">Telegram</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
