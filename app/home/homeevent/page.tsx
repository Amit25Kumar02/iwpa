"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { formatImageUrl } from "@/lib/utils";

export default function Homeevent() {
  const [header, setHeader] = useState<any>(null);
  const [conferences, setConferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_STRAPI_URL;

        const res = await axios.get(
          `${API}/api/homeevent?populate[0]=badge_img&populate[1]=homeeventcard&populate[2]=homeeventcard.img`
        );

        console.log('Conference header data:', res.data.data);
        console.log('Badge img:', res.data.data?.badge_img);
        
        setHeader(res.data.data);
        setConferences(res.data.data?.homeeventcard || []);
      } catch (err) {
        console.error("Conference fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-16 bg-[#ffffff] relative overflow-hidden">
      {/* Top Left Vector */}
      <Image
        src="/vector/elements3.png.png"
        alt=""
        width={256}
        height={256}
        className="absolute hidden md:block top-0 left-0 w-52 md:w-74 lg:w-80 "
      />

      {/* Bottom Left Vector */}
      <Image
        src="/vector/elements4.png.png"
        alt=""
        width={256}
        height={256}
        className="absolute hidden md:block bottom-0 left-12 w-29 md:w-29 lg:w-27.5 "
      />

      {/* Bottom Right Vector */}
      <Image
        src="/vector/elements4.png.png"
        alt=""
        width={256}
        height={256}
        className="absolute hidden md:block bottom-0 right-10 w-29 md:w-29 lg:w-27.5 "
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#1F7A4D] bg-[#1F7A4D0F] px-4 py-2 rounded text-sm">
            {header?.badge_img?.url && (
              <img
                src={formatImageUrl(header.badge_img.url)}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {header?.badge}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#0F172A]">
            {header?.title}
          </h2>
        </div>

        {/* Conference Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((event: any, index: number) => (
            <div
              key={index}
              className="border-8 border-[#1F7A4D33] rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              {event.img?.url && (
                <img
                  src={formatImageUrl(event.img.url)}
                  alt="Conference"
                  className="rounded-lg w-full h-[220px] "
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
