"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    about: false,
    events: false,
    publications: false,
    members: false,
    literature: false,
  });

  const toggleMobileDropdown = (menu: keyof typeof mobileDropdowns) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <nav className="bg-[#ffffff]  border-black/10 border ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Menu */}
        <ul className="hidden lg:flex justify-end gap-7 py-3.5 mx-12.5 m-0 list-none">
          <li className="relative group">
            <Link href="/about" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              ABOUT IWPA <ChevronDown size={16} className="mt-0.5" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  About IWPA
                </Link>
                <Link
                  href="/about/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  About Wind Energy
                </Link>
                <Link
                  href="/about/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Vision and Mission
                </Link>
                <Link
                  href="/about/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Activity and Goals
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/events/circulars" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              CIRCULARS
            </Link>
          </li>
          <li className="relative group">
            <Link href="/events" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              EVENTS <ChevronDown size={16} className="mt-0.5" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link
                  href="/events/upcoming"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Upcoming Events
                </Link>
                <Link
                  href="/events/past"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Past Events
                </Link>
              </div>
            </div>
          </li>
          <li className="relative group">
            <Link href="/publications" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              PUBLICATIONS <ChevronDown size={16} className="mt-0.5" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link
                  href="/publications"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  WINDPRO Magazin
                </Link>
                <Link
                  href="/publications/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Tutorials
                </Link>
                <Link
                  href="/publications/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Training Centers
                </Link>
                <Link
                  href="/publications/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Journals
                </Link>
                <Link
                  href="/publications/#"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Magazin Tariffs
                </Link>
              </div>
            </div>
          </li>
          <li className="relative group">
            <Link href="#" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              MEMBERS <ChevronDown size={16} className="mt-0.5" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <a
                  href="/pdf/IWPA-Membership-Form(New).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Membership Form
                </a>
                <a
                  href="/pdf/membership-information-sheet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Membership Information Sheet
                </a>
              </div>
            </div>
          </li>
          <li className="relative group">
            <Link href="/literature" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              LITERATURE <ChevronDown size={16} className="mt-0.5" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <a
                  href="/pdf/status_of_power_sector_reform.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-[#0b3d5c] hover:bg-gray-50 hover:text-[#2ea44f] transition-colors"
                >
                  Status of Power Sector Reforms
                </a>
              </div>
            </div>
          </li>

          <li>
            <Link href="/sector-updates" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              SECTOR UPDATES
            </Link>
          </li>
          <li>
            <Link href="/useful-links" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              USEFUL LINKS
            </Link>
          </li>
          <li>
            <Link href="/contact" className="no-underline text-[#0b3d5c] font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-[#2ea44f]">
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-end py-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#0b3d5c]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col py-4 space-y-2 list-none">
              <li>
                <button
                  onClick={() => toggleMobileDropdown('about')}
                  className="w-full text-left px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50 flex items-center justify-between"
                >
                  ABOUT IWPA
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdowns.about ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.about && (
                  <div className="pl-4 bg-gray-50">
                    <Link href="/about/iwpa" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      About IWPA
                    </Link>
                    <Link href="/about/wind-energy" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      About Wind Energy
                    </Link>
                    <Link href="/about/vision-mission" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Vision and Mission
                    </Link>
                    <Link href="/about/activity-goals" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Activity and Goals
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleMobileDropdown('events')}
                  className="w-full text-left px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50 flex items-center justify-between"
                >
                  EVENTS
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdowns.events ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.events && (
                  <div className="pl-4 bg-gray-50">
                    <Link href="/events/upcoming" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Upcoming Events
                    </Link>
                    <Link href="/events/past" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Past Events
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleMobileDropdown('publications')}
                  className="w-full text-left px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50 flex items-center justify-between"
                >
                  PUBLICATIONS
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdowns.publications ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.publications && (
                  <div className="pl-4 bg-gray-50">
                    <Link href="/publications/windpro-magazin" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      WINDPRO Magazin
                    </Link>
                    <Link href="/publications/tutorials" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Tutorials
                    </Link>
                    <Link href="/publications/training-centers" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Training Centers
                    </Link>
                    <Link href="/publications/journals" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Journals
                    </Link>
                    <Link href="/publications/magazin-tariffs" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Magazin Tariffs
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleMobileDropdown('members')}
                  className="w-full text-left px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50 flex items-center justify-between"
                >
                  MEMBERS
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdowns.members ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.members && (
                  <div className="pl-4 bg-gray-50">
                    <a href="/pdf/IWPA-Membership-Form(New).pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Membership Form
                    </a>
                    <a href="/pdf/membership-information-sheet.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Membership Information Sheet
                    </a>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleMobileDropdown('literature')}
                  className="w-full text-left px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50 flex items-center justify-between"
                >
                  LITERATURE
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdowns.literature ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.literature && (
                  <div className="pl-4 bg-gray-50">
                    <a href="/pdf/status_of_power_sector_reform.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-[#0b3d5c] hover:text-[#2ea44f]">
                      Status of Power Sector Reforms
                    </a>
                  </div>
                )}
              </li>
              <li>
                <Link href="/events/circulars" className="block px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50">
                  CIRCULARS
                </Link>
              </li>
              <li>
                <Link href="/sector-updates" className="block px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50">
                  SECTOR UPDATES
                </Link>
              </li>
              <li>
                <Link href="/useful-links" className="block px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50">
                  USEFUL LINKS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block px-4 py-2 text-[#0b3d5c] font-semibold text-sm hover:text-[#2ea44f] hover:bg-gray-50">
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
