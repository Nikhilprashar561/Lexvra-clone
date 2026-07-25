"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
          *{
            font-family: "Geist", sans-serif;
          }
        `}
      </style>
      <div className={`mb-5 pt-20 px-4 transition-colors duration-300 ${isDark ? "bg-neutral-950" : "bg-gray-50"}`}>
        <footer className={`w-full max-w-[1350px] mx-auto pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden transition-colors duration-300 ${
          isDark 
            ? "bg-neutral-900 text-white" 
            : "bg-white text-black"
        }`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
            
            <div className="lg:col-span-3 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/images/LX-logo.png" alt="Lexvra Logo" width={50} height={35} className="h-12 rounded-lg w-auto" />
                <div>
                  <h2 className={`font-bold text-lg transition-colors ${isDark ? "text-white" : "text-black"}`}>
                    Lexvra <span className="text-blue-600">InFinology</span>
                  </h2>
                  <p className={`text-xs transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>PVT LTD</p>
                </div>
              </Link>
              <p className={`text-sm/6 max-w-96 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>We are passionate about building digital solutions that drive real results for businesses around the world.</p>
              <div className="flex gap-5 md:gap-6 order-1 md:order-2">
                {/* X (Twitter) */}
                <Link href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </Link>
                {/* Github */}
                <Link href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                </Link>
                {/* Linkedin */}
                <Link href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </Link>
                {/* Youtube */}
                <Link href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4"/><path d="m10 15 5-3-5-3z"/>
                  </svg>
                </Link>
                {/* Instagram */}
                <Link href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
              {/* Quick Links */}
              <div>
                <h3 className={`font-medium text-sm mb-4 transition-colors ${isDark ? "text-white" : "text-black"}`}>Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Home</Link></li>
                  <li><Link href="/about" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>About</Link></li>
                  <li><Link href="/careers" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Careers</Link></li>
                  <li><Link href="/contact" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Contact</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className={`font-medium text-sm mb-4 transition-colors ${isDark ? "text-white" : "text-black"}`}>Services</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/services" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Web Development</Link></li>
                  <li><Link href="/services" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Mobile App Development</Link></li>
                  <li><Link href="/services" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>UI/UX Design</Link></li>
                  <li><Link href="/services" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>Cloud Solutions</Link></li>
                  <li><Link href="/services" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>AI Integration</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-span-2 md:col-span-1">
                <h3 className={`font-medium text-sm mb-4 transition-colors ${isDark ? "text-white" : "text-black"}`}>Contact Info</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="mailto:infinologylexvra@gmail.com" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>infinologylexvra@gmail.com</Link></li>
                  <li><Link href="tel:+919317902609" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>+91 93179 02609</Link></li>
                  <li><Link href="https://www.google.com/maps/search/?api=1&query=D+256+Industrial+Area+Sector+75+Sahibzada+Ajit+Singh+Nagar+Punjab+140307" target="_blank" rel="noopener noreferrer" className={`transition-colors text-xs ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>D 256, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 140307</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`max-w-7xl mx-auto mt-12 pt-4 border-t transition-colors ${isDark ? "border-gray-800" : "border-gray-200"} flex justify-between items-center flex-wrap gap-4`}>
            <p className={`text-sm transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>© 2026 Lexvra InFinology PVT LTD. </p>
            <p className={`text-sm transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>All Rights Reserved.</p>
          </div>
          <div className="relative mb-3">
            <div className={`absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 rounded-full blur-[100px] pointer-events-none transition-colors ${isDark ? "bg-slate-800" : "bg-slate-100"}`}/>
            <h1 className={`text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] mt-6 transition-colors ${isDark ? "[-webkit-text-stroke:1px_#4B5563]" : "[-webkit-text-stroke:1px_#D4D4D4]"}`} >
              Lexvra
            </h1>
          </div>
        </footer>
      </div>
    </>
  );
}
        