import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B3C5D] text-[#ffffff] pt-14 pb-6 relative overflow-hidden">
      {/* Top Right Image */}
      <Image 
        src="/footer/elements1.png.png" 
        alt="" 
        width={421} 
        height={422} 
        className="absolute top-0 right-0 opacity-100"
      />
      
      {/* Bottom Left Image */}
      <Image 
        src="/footer/elements2.png.png" 
        alt="" 
        width={50} 
        height={80} 
        className="absolute bottom-0 left-0 opacity-100"
      />
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        
        {/* Column 1 — About */}
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo/logo2.png.png" alt="IWPA Logo" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">IWPA</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            The Indian Wind Power Association (IWPA) was set up in 1996 as a non-profit organization. 
            The association which began with 21 members.
          </p>

          <div className="flex gap-3">
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <Facebook size={16} />
            </div>
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <Linkedin size={16} />
            </div>
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <Instagram size={16} />
            </div>
            <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <Youtube size={16} />
            </div>
          </div>
        </div>

        {/* Column 2 — Useful Links */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Services</Link></li>
            <li><Link href="#" className="hover:text-white">Why Choose Us</Link></li>
            <li><Link href="#" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3 — About IWPA */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4">About IWPA</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:text-white">About IWPA</Link></li>
            <li><Link href="#" className="hover:text-white">About Wind Energy</Link></li>
            <li><Link href="#" className="hover:text-white">Vision and Mission</Link></li>
            <li><Link href="#" className="hover:text-white">Activity & Goals</Link></li>
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1" />
              <span>E, 6th Floor, Shakti Towers- 766,<br />Tamil Nadu - INDIA</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} />
              <span>91 44 45540306 - 45504281</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} />
              <span>iwpa@windpro.org</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl border-t-[0.86px] border-[#4C525C] mt-8 md:mt-10 pt-4 md:pt-5 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-300 gap-3">
          <p>Copyright © Indian Wind Power Association 2025</p>
          <div className="flex gap-4 md:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
