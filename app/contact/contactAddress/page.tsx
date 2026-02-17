"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { formatImageUrl } from "@/lib/utils";

interface ContactCard {
  tab_name: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  img?: string;
}

interface PresenceData {
  badge: string;
  badge_img?: string;
  title: string;
  contactcard: ContactCard[];
}

export default function IwpaPresenceSection() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [data, setData] = useState<PresenceData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔑 refs for tabs
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API}/api/contactaddress?populate[0]=badge_img&populate[1]=contactcard&populate[2]=contactcard.img`
      );

      const d = res.data.data;

      setData({
        badge: d.badge,
        badge_img: formatImageUrl(d.badge_img?.url),
        title: d.title,
        contactcard:
          d.contactcard?.map((card: any) => ({
            tab_name: card.tab_name,
            address: card.address,
            phone: card.phone,
            fax: card.fax,
            email: card.email,
            img: formatImageUrl(card.img?.url),
          })) || [],
      });
    };

    fetchData();
  }, [API]);

  // 🔁 update underline position & width
  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      setIndicator({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [activeIndex, data?.contactcard]);

  if (!data) return null;

  const activeOffice = data.contactcard[activeIndex];

  return (
    <section className="py-10 md:py-20 bg-[#F6F8FA]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border border-[#1F7A4D0F] text-[#1F7A4D] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium mb-4">
            {data.badge_img && (
              <img
                src={data.badge_img}
                alt="badge"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            )}
            {data.badge}
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#001233]">
            {data.title}
          </h2>
        </div>

        {/* Tabs */}
        {data.contactcard.length > 0 && (
          <div className="relative mb-8 md:mb-12">

            {/* Tab Buttons */}
            <div className="relative flex justify-center gap-4 md:gap-6 text-[15px] font-bold max-w-6xl mx-auto">
              {data.contactcard.map((office, index) => (
                <button
                  key={index}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={() => setActiveIndex(index)}
                  className={`pb-4 transition whitespace-nowrap cursor-pointer
                    ${
                      activeIndex === index
                        ? "text-[#1F7A4D]"
                        : "text-[#767676] hover:text-[#0B6B3A]"
                    }
                  `}
                >
                  {office.tab_name}
                </button>
              ))}
            </div>

            {/* White base line */}
            <div className="relative mt-1 h-[3.88px] bg-white rounded-full max-w-6xl mx-auto">
              {/* Green active line */}
              <span
                className="absolute top-0 h-full bg-[#1F7A4D] rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: indicator.width,
                  left: indicator.left,
                }}
              />
            </div>

          </div>
        )}

        {/* Active Office Content */}
        {activeOffice && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start bg-white rounded-2xl">

            {/* Left Info */}
            <div className="bg-[#F6F8FA] p-4 md:p-8 rounded-2xl shadow-sm md:my-auto md:ml-10 order-2 lg:order-1">
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                <strong>Address:</strong> {activeOffice.address}
              </p>
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                <strong>Phone:</strong> {activeOffice.phone}
              </p>
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                <strong>Tele-fax:</strong> {activeOffice.fax}
              </p>
              <p className="text-sm md:text-base">
                <strong>Email:</strong> {activeOffice.email}
              </p>
            </div>

            {/* Right Image */}
            {activeOffice.img && (
              <div className="order-1 lg:order-2">
                <img
                  src={activeOffice.img}
                  alt={activeOffice.tab_name}
                  className="w-full h-[250px] md:h-[320px] object-cover rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-md"
                />
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
