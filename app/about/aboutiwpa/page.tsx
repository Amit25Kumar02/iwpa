"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, BadgeCheck } from "lucide-react";
import axios from "axios";
// import api from "@/lib/api";

import { formatImageUrl } from "@/lib/utils";

interface AboutData {
    title: string;
    heading: string;
    description: string;
    vision: string;
    mission: string;
    why_choose: string[];
    image: string;
    badge_img: string;
    button_text: string;
    button_link: string;
}

export default function AboutIWPA() {
    const [data, setData] = useState<AboutData | null>(null);
    const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'why'>('vision');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about?populate=*`);

                const data = res.data.data;

                setData({
                    title: data.badge,
                    heading: data.title,
                    description: data.description,
                    vision: data.vision,
                    mission: data.mission,
                    why_choose: data.why_choose ? data.why_choose.split('\n') : [],
                    image: formatImageUrl(data.img?.url),
                    badge_img: formatImageUrl(data.badge_img?.url),
                    button_text: data.button,
                    button_link: data.button_url || '#',
                });
            } catch (error) {
                console.error("Strapi About fetch error:", error);
            }
        };

        fetchData();
    }, []);

    if (!data)
        return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <section className="py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                <span className="inline-flex items-center gap-2 bg-[#00796B14] text-[#00796B] px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm mb-4">
                    <img
                        src={data.badge_img}
                        alt="badge"
                        className="w-3 h-3 md:w-4 md:h-4"
                    />
                    {data.title}
                </span>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1F2937] mb-8 md:mb-10">
                    {data.heading}
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start text-left">
                    {/* IMAGE */}
                    <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] order-1 lg:order-1">
                        <img
                            src={data.image}
                            alt="About IWPA"
                            className="w-full h-[250px] md:h-[350px] lg:h-full object-cover"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="order-2 lg:order-2">
                        <p className="text-[#6B7280] text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                            {data.description}
                        </p>
                        
                        {/* Top Tabs */}
                        <div className="relative mb-6">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#E5E7EB] hidden sm:block" />
                            <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 cursor-pointer">
                                <button 
                                    onClick={() => setActiveTab('vision')}
                                    className={`text-lg md:text-xl lg:text-[22px] font-semibold pt-3 relative text-left cursor-pointer ${
                                        activeTab === 'vision' ? 'text-[#0B6B3A]' : 'text-[#0F172A]'
                                    }`}
                                >
                                    {activeTab === 'vision' && (
                                        <span className="absolute top-0 left-0 w-20 md:w-30 h-1 bg-[#0B6B3A] rounded-full"></span>
                                    )}
                                    Our Vision
                                </button>
                                <button 
                                    onClick={() => setActiveTab('mission')}
                                    className={`text-lg md:text-xl lg:text-[22px] font-semibold pb-2 pt-3 relative text-left cursor-pointer ${
                                        activeTab === 'mission' ? 'text-[#0B6B3A]' : 'text-[#0F172A]'
                                    }`}
                                >
                                    {activeTab === 'mission' && (
                                        <span className="absolute top-0 left-0 w-20 md:w-30 h-1 bg-[#0B6B3A] rounded-full"></span>
                                    )}
                                    Our Mission
                                </button>
                                <button 
                                    onClick={() => setActiveTab('why')}
                                    className={`text-lg md:text-xl lg:text-[22px] font-semibold pb-2 pt-3 relative text-left cursor-pointer ${
                                        activeTab === 'why' ? 'text-[#0B6B3A]' : 'text-[#0F172A]'
                                    }`}
                                >
                                    {activeTab === 'why' && (
                                        <span className="absolute top-0 left-0 w-20 md:w-30 h-1 bg-[#0B6B3A] rounded-full"></span>
                                    )}
                                    Why Choose Us
                                </button>
                            </div>

                            {/* Content based on active tab */}
                            {activeTab === 'vision' && (
                                <p className="text-[#334155] text-sm md:text-base lg:text-[17px] leading-relaxed mb-8 md:mb-10 mt-6">
                                    <span className="font-semibold text-[#0F172A]">Our vision:</span>{" "}
                                    {data.vision}
                                </p>
                            )}

                            {activeTab === 'mission' && (
                                <p className="text-[#334155] text-sm md:text-base lg:text-[17px] leading-relaxed mb-8 md:mb-10 mt-6">
                                    <span className="font-semibold text-[#0F172A]">Our Mission:</span>{" "}
                                    {data.mission}
                                </p>
                            )}

                            {activeTab === 'why' && (
                                <div className="text-[#334155] text-sm md:text-base lg:text-[17px] leading-relaxed mb-8 md:mb-10 mt-6">
                                    <span className="font-semibold text-[#0F172A] block mb-3">Why Choose Us:</span>
                                    <ul className="space-y-2">
                                        {data.why_choose.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-[#0B6B3A] mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Button */}
                            <Link
                                href={data.button_link}
                                className="inline-flex items-center gap-2 bg-[#0B6B3A] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:opacity-90 transition text-sm md:text-base"
                            >
                                {data.button_text}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
