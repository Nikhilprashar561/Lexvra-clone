"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const DISPLAY_DURATION = 4500; // total time the splash stays on screen (ms)
const FADE_DURATION = 600; // fade-out transition time (ms)

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while splash is showing
    document.body.style.overflow = "hidden";

    // Animate the progress bar from 0 -> 100 over DISPLAY_DURATION
    const start = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / DISPLAY_DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressInterval);
    }, 30);

    // Start fade-out just before the total duration ends
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, DISPLAY_DURATION);

    // Fully remove from DOM after the fade completes
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DISPLAY_DURATION + FADE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-opacity ease-out ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
    >
      <style>
        {`
          @keyframes logoPop {
            0% { opacity: 0; transform: scale(0.8) translateY(8px); }
            60% { opacity: 1; transform: scale(1.04) translateY(0); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes textFade {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes ringSpin {
            to { transform: rotate(360deg); }
          }
          .preload-logo { animation: logoPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .preload-text { animation: textFade 0.7s ease-out 0.5s both; }
          .preload-ring {
            animation: ringSpin 1.4s linear infinite;
          }
        `}
      </style>

      {/* Logo mark with spinning ring */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg
          className="preload-ring absolute inset-0 h-full w-full"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2.5"
            className="text-zinc-900 dark:text-white"
          />
          <path
            d="M40 4a36 36 0 0 1 25.46 61.46"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-zinc-900 dark:text-white"
          />
        </svg>

        <div className="preload-logo flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xl">
          {/* Swap this for your <Image src="/images/Lx-logo.png" .../> if you prefer the real logo file */}
          <span className="text-lg font-bold tracking-tight">Lx</span>
        </div>
      </div>

      {/* Wordmark */}
      <div className="preload-text mt-5 flex flex-col items-center">
        <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
          Lexvra <span className="text-zinc-500 dark:text-zinc-400">InFinology</span>
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Pvt Ltd
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-900 dark:bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
