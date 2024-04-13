import React, { useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { FaPinterest } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LiaFaxSolid } from "react-icons/lia";
import vitotaLogo from "../assets/image/vitotoa__logo.png";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);
  return (
    <div className='w-full h-screen relative z-10 bg-white'>
      <div className="w-full min-h-[98%] bg-[#000000] bg-opacity-90 flex flex-col md:flex-row gap-20 py-10 px-5 relative">
        <div className="w-full py-6 text-center md:w-[30%] h-[100%]">
          <img className='ml-[25%] md:ml-12' src={vitotaLogo} alt=""  />
          <p className='leading-9 mt-6 text-sm text-capitalize text-center flex flex-col text-white '>It is a long established fact that a <br /> reader will be distracted by the <br /> readable content.Lorem Ipsum is <br /> simply dummy text of been the <br /> industry's standard ...</p>
          <div className="flex justify-center items-center md:ml-0 gap-3 md:gap-4 mt-6 ">
            <div className="p-2 bg-white rounded-full"><TiSocialFacebook /></div>
            <div className="p-2 bg-white rounded-full"><FaPinterest /></div>
            <div className="p-2 bg-white rounded-full"><TiSocialTwitter /></div>
            <div className="p-2 bg-white rounded-full"><AiOutlineInstagram /></div>
            <div className="p-2 bg-white rounded-full"><FaLinkedinIn /></div>
          </div>
        </div>
        <div className="text-capitalize flex flex-col text-white text-center py-6 w-full md:w-[15%] h-[100%]">
          <h1 className="my-3 block font-bold text-lg">MAIN MENU</h1>
          <a href="" className="my-3 block">Home</a>
          <a href="" className="my-3 block">Search</a>
          <a href="" className="my-3 block">Privicy Policy</a>
          <a href="" className="my-3 block">Shipping Info</a>
          <a href="" className="my-3 block">Latest News</a>
          <a href="" className="my-3 block">Catalog</a>
        </div>
        <div className="text-capitalize flex flex-col text-white text-center py-6 w-full md:w-[15%] h-[100%]">
          <h1 className="my-3 block font-bold text-lg">QUICK VIEW</h1>
          <a href="" className="my-3 block">Best Product</a>
          <a href="" className="my-3 block">Cosmetics</a>
          <a href="" className="my-3 block">Beauty World</a>
          <a href="" className="my-3 block">Offer Collection</a>
          <a href="" className="my-3 block">Mega Collection</a>
          <a href="" className="my-3 block">Training Collection</a>
        </div>
        <div className="text-capitalize flex flex-col text-white text-center py-6 w-full md:w-[15%] h-[100%]">
          <h1 className="my-3 block font-bold text-lg">LINKS</h1>
          <a href="" className="my-3 block">About Us</a>
          <a href="" className="my-3 block">Contact Us</a>
          <a href="" className="my-3 block">Faq</a>
          <a href="" className="my-3 block">Portfolio</a>
          <a href="" className="my-3 block">Search</a>
          <a href="" className="my-3 block">Wishlist</a>
          <a href="" className="my-3 block">Lookbook</a>
        </div> 
        <div className="text-capitalize flex flex-col text-white text-center py-6 w-full md:w-[15%] h-[100%]">
          <h1 className='font-bold text-lg'>STORE INFO</h1>
          <a href="" className="my-3 block"><IoLocationOutline className='inline-block' />   Vitota Beauty Store  <br /> Bhopal India</a>
          <a href="" className="my-3 block"><IoCall className='inline-block' /> Call Us: +918319384910</a>
          <a href="" className="my-3 block"><MdOutlineEmail className='inline-block' /> Email Us: <br /> support@vitota.in</a>
          <a href="" className="my-3 block"><LiaFaxSolid className='inline-block' /> Fax: 7582908615</a>
        </div>
        <div className="absolute right-6 bottom-10 p-4 bg-red-400 rounded-full border-4 border-white"><a href=""><MdKeyboardDoubleArrowUp /></a></div>
      </div>
      <div className="ftr w-full py-8 px-10 text-black bg-[#FFFFFF]">
        <p className='text-black'>{currentYear} -   Copy Right by XYZ</p>
      </div>
    </div>
  )
}

export default Footer