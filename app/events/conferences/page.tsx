"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatImageUrl } from "@/lib/utils";

export default function ConferencesPage() {
  const [header, setHeader] = useState<any>(null);
  const [conferences, setConferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_STRAPI_URL;

        const res = await axios.get(
          `${API}/api/eventconference?populate[0]=badge_img&populate[1]=eventconfcard&populate[2]=eventconfcard.img`
        );

        console.log('Conference header data:', res.data.data);
        console.log('Badge img:', res.data.data?.badge_img);
        
        setHeader(res.data.data);
        setConferences(res.data.data?.eventconfcard || []);
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#1F7A4D] bg-[#1F7A4D0F] px-4 py-2 rounded text-sm">
            {header?.badge_img?.[0]?.url && (
              <img
                src={formatImageUrl(header.badge_img[0].url)}
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
                  className="rounded-lg w-full h-[220px] object-cover"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
