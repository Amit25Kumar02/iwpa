"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import { formatImageUrl } from "@/lib/utils";

interface OurValueData {
    badge: string;
    title: string;
    heading: string;
    description: string;
    image: string;
    badge_img: string;
}

export default function OurValueSection() {
    const [data, setData] = useState<OurValueData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/aboutvalue?populate=*`
                );

                const d = res.data.data;

                setData({
                    badge: d.badge,
                    title: d.title,
                    heading: d.heading,
                    description: d.description,
                    image: formatImageUrl(d.img?.url),
                    badge_img: formatImageUrl(d.badge_img?.url),
                });
            } catch (error) {
                console.error("Strapi Our Value fetch error:", error);
            }
        };

        fetchData();
    }, []);

    if (!data)
        return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <section className="mt-8 md:mt-12 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 bg-[#0B6B3A14] text-[#0B6B3A] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium mb-4">
                    {data.badge_img && (
                        <img
                            src={data.badge_img}
                            alt="badge"
                            className="w-3 h-3 md:w-4 md:h-4"
                        />
                    )}
                    {data.badge}
                </span>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-6 md:mb-8">
                    {data.title}
                </h2>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center text-left">
                    {/* Left Content Card */}
                    <div className="bg-white px-4 md:px-6 lg:px-8 py-4 md:py-6 rounded-2xl shadow-sm order-2 lg:order-1">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#475569] mb-3 md:mb-4">
                            {data.heading}
                        </h3>
                        <div className="text-[#475569] text-sm md:text-base leading-relaxed space-y-3 md:space-y-4">
                            {data.description && data.description.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Card */}
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] order-1 lg:order-2">
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Wind Energy"
                                className="w-full h-[250px] md:h-[300px] lg:h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
