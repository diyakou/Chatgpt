'use client'
import React from 'react';
import './about.css';
import Image from 'next/dist/client/image';
import Navbar from '../Navbar/navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Footer from '../footer/page.js';

const Click = () => {
      redirect('https://instagram.com/dr_webiran')
}
const SkillCircle = ({ skill, percentage }) => {
    const circleSize = 80;
    const circleRadius = (circleSize - 4) / 2;
    const circumference = 2 * Math.PI * circleRadius;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="skill-circle">
        <svg height={circleSize} width={circleSize}>
          <circle
            r={circleRadius}
            cx={circleSize / 2}
            cy={circleSize / 2}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
          />
          <circle
            r={circleRadius}
            cx={circleSize / 2}
            cy={circleSize / 2}
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="14px"
            fontWeight="bold"
          >
            {percentage}%
          </text>
        </svg>
        <p>{skill}</p>
      </div>
    );
  };
  
const About = () => {
  return (
    <>
      <Navbar />

      <div className='container bg-dark'>
        <div className='photo ml-48'>
          <Image
            src='/char1.png'
            width='500'
            height='500'
            className='pic1'
            alt='مرتضی تقوی'
          ></Image>
        </div>
        <h3 className="h3-txt">Dr WebIran</h3>
        <div className="box1 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <div>
            <span className="inline-flex items-center justify-center p-2 bg-white-500 rounded-md shadow-lg">
              <Image
                src='/mypic.jpg'
                width='50'
                height='50'
                alt='Morteza Taghavi'
              ></Image>
            </span>
          </div>
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Hi MyName is Morteza</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            I'm a fullStack Developer, I live in Iran, and I love my job. I hope to be helpful to those who need me.
          </p>
        </div>

        <div className='skills'>
          <Image
            src='/char2.png'
            width='500'
            height='500'
            className='char2'
          ></Image>
          <h1 className='h1-txt'>Skills</h1>
          <div className="box2 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">

          <div className="skill-bar">
            <SkillCircle skill="Node.js" percentage={90}/>
            <SkillCircle skill="Next.js" percentage={80} />
            <SkillCircle skill="Laravel" percentage={85} />
            <SkillCircle skill="Python" percentage={95} />
          </div>
        </div>

</div>
<div className='container3'>
    <Image
    src='/char3.png'
    width='500'
    height='500'
    alt='Morteza Taghavi'
    className='char3'
    />
             
</div> 
<div className="box3 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                <h1 className='title3'><a href='/pages/contact'>You can tell me  on Contact page</a></h1>
           
</div>
      </div>
      <footer>
        <Footer />
        </footer>  
    </>
  );
};

export default About;
