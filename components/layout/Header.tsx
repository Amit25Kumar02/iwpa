import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="relative font-sans">
      {/* Blue Top Bar */}
      <div className="bg-[#0B3C5D] py-4">
        <div className="max-w-300 mx-auto px-4 flex items-center justify-between">
          <div /> {/* Empty spacer */}
          <button className="bg-[#1F7A4D] text-[#ffffff] flex gap-1 items-center border-none py-2 px-4 md:py-2.5 md:px-4.5 font-semibold rounded-md cursor-pointer transition-all duration-300 hover:bg-[#238636] text-sm md:text-base">
            Become a Member <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Floating Logo */}
      <Link href="/" className="absolute left-[10%] -translate-x-[60%] md:left-[10%] md:-translate-x-[60%] left-4 translate-x-0 top-1.5 z-10 bg-[#ffffff] py-2 px-3.5">
        <Image src="/logo/IWPA LOGO 1.png" alt="IWPA Logo" width={100} height={100} className="h-12 md:h-16 lg:h-25 w-auto" />
      </Link>

      {/* White Navbar */}
      <Navbar />
    </header>
  );
}
