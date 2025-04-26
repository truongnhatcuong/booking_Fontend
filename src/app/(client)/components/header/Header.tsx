"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Facebook,
  Twitter,
  Instagram,
  WebcamIcon as Skype,
} from "lucide-react";
import NavBar from "./NavBar";
import Image from "next/image";
import ListItem from "../ListHeader/ListItem";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center z-20 relative mb-10 ">
        {/* Logo and Mobile Nav */}
        <div className="flex justify-between items-center w-screen md:w-auto">
          <Link href={"/"}>
            <Image
              alt="Logo"
              src={"/image/logo2.png"}
              width={100}
              height={100}
              className="w-32 md:w-40 object-contain"
            />
          </Link>
          <NavBar open={open} setOpen={setOpen} />
        </div>

        {/* Contact Info and Search Bar */}
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-2">
            <div className="border-2 border-blue-900 rounded-full p-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-900">
                +1 (818) 333 44 55
              </div>
              <div className="text-sm text-gray-500">24/7 Help Support</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 rounded-full border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-900">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative ">
        <nav className="bg-blue-900 rounded-full mx-auto mt-4 z-10 w-full md:w-2/3 hidden md:block absolute -top-12 left-1/5">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Primary Navigation */}
              <div className="flex items-center  w-full">
                <ListItem />
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-3">
                <Link href="#" className="text-white hover:text-teal-500">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-white hover:text-teal-500">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-white hover:text-teal-500">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-white hover:text-teal-500">
                  <Skype className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
