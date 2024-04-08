import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";


const Footer = () => {
  return (
    <section className=" bg-gray-100 mt-4">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-4 gap-y-5 gap-x-5 md:pt-16 md:grid-cols-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="  font-bold md:text-lg">For designers</h3>
          <ul className=" text-gray-700 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Go Pro!</a>
            </li>
            <li>
              <a href="/">Explore design work</a>
            </li>
            <li>
              <a href="/">Design blog</a>
            </li>
            <li>
              <a href="/">Overtime podcast</a>
            </li>
            <li>
              <a href="/">Playoffs</a>
            </li>
            <li>
              <a href="/">Weekely Warm-Up</a>
            </li>
            <li>
              <a href="/">Refer a friend</a>
            </li>
            <li>
              <a href="/">Code of conduct</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="  font-bold md:text-lg">Hire designers</h3>
          <ul className=" text-gray-700 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Post a job opening</a>
            </li>
            <li>
              <a href="/">Post a freelance project</a>
            </li>
            <li>
              <a href="/">Search a designers</a>
            </li>
            <li>
              <a className=" text-black font-bold" href="/">Brands</a>
            </li>
            <li>
              <a href="/">Advertise with us</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="  font-bold md:text-lg">Company</h3>
          <ul className=" text-gray-700 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">Support</a>
            </li>
            <li>
              <a href="/">Media kit</a>
            </li>
            <li>
              <a href="/">Testimonials</a>
            </li>
            <li>
              <a href="/">API</a>
            </li><li>
              <a href="/">Terms of service</a>
            </li>
            <li>
              <a href="/">Privacy policy</a>
            </li>
            <li>
              <a href="/">Cookie policy</a>
            </li>
            
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-start-auto lg:col-span-2">
          <h3 className="  font-bold md:text-lg">Directories</h3>
          <ul className=" text-gray-700 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Design jobs</a>
            </li>
            <li>
              <a href="/">Designers for hire</a>
            </li>
            <li>
              <a href="/">Freelance designers for hire</a>
            </li>
            <li>
              <a href="/">Tags</a>
            </li>
            <li>
              <a href="/">Places</a>
            </li>
            <li>
              <a className=" text-black font-bold" href="/">Designs assets</a>
            </li>
            <li>
              <a href="/">Dribble Marketplace</a>
            </li>
            <li>
              <a href="/">Creative Market</a>
            </li>
            <li>
              <a href="/">Fontspring</a>
            </li>
            <li>
              <a href="/">Font Squirrel</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="  font-bold md:text-lg">Design Resources</h3>
          <ul className=" text-gray-700 text-sm mt-5 space-y-4 md:text-base">
            <li>
            <a href="/contactSales">Freelancing</a>
            </li>
            <li>
              <a href="/">Design Hiring</a>
            </li>
            <li>
              <a href="/">Design Portfolio</a>
            </li>
            <li>
              <a href="/">Design Education</a>
            </li>
            <li>
              <a href="/">Creative Process</a>
            </li>
            <li>
              <a href="/">Design Industry Trends</a>
            </li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <div className=" text-3xl font-medium text-pink-600">dribble</div>
          <p className="text-sm text-gray-800 font-medium text-center mt-4 md:text-left md:text-base lg:text-sm">
            Dribble is the world's leading community for creatives to share,grow and get hired.
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-800 md:justify-start">
            <li>
              <a href="https://www.linkedin.com/company/taskbuk/">
                <AiFillLinkedin className=" w-8 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-12">
          
          <hr className=" border-solid border-1 w-[100%] m-2 border-gray-300" />
          <div className=" flex justify-between py-3 w-[100%]">
           <div className=" text-gray-700 font-semibold"> © 2023 Dribble. All rights reserved.</div>
           <div className=" text-gray-700 font-semibold">
            <span className=" font-bold">20,501,853 </span>
            shorts dribbled
           </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;