// app/not-found.tsx

import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      {/* Random Stars */}
      <div className="absolute inset-0">
        <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[80%] top-[25%] h-1.5 w-1.5 rounded-full bg-white/40" />
        <div className="absolute left-[25%] bottom-[20%] h-1 w-1 rounded-full bg-white/20" />
        <div className="absolute right-[15%] bottom-[18%] h-2 w-2 rounded-full bg-white/30" />
        <div className="absolute left-[60%] top-[70%] h-1 w-1 rounded-full bg-white/25" />
      </div>

      {/* Huge 404 */}
      <h1 className="pointer-events-none absolute text-[18rem] font-black tracking-widest text-white/[0.03] select-none">
        404
      </h1>

      <div className="relative z-10 flex max-w-xl flex-col items-center px-6 text-center">
        {/* Floating Ghost */}
        <div className="animate-bounce rounded-full border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <Ghost className="h-20 w-20" strokeWidth={1.5} />
        </div>

        <h2 className="mt-10 text-5xl font-bold tracking-tight">
          Lost in the Dark?
        </h2>

        <p className="mt-5 max-w-md text-lg leading-7 text-white/60">
          We searched every corner of the internet...
          even under the sofa.
          <br />
          This page simply doesn't exist.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          >
            <ArrowLeft
              size={18}
              className="transition group-hover:-translate-x-1"
            />
            Go Home
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Go Back
          </Link>
        </div>

        <p className="mt-8 text-sm italic text-white/35">
          "Even Google couldn't find this one." 👀
        </p>
      </div>
    </main>
  );
}
