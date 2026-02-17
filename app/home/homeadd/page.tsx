"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { formatImageUrl } from "@/lib/utils";

type Service = {
  id: number;
  title: string;
  badge_img?: string;
};

export default function HomeAddPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homeadd?populate=homeaddcard&populate=homeaddcard.badge_img`
        );
        
        const data = res.data.data;
        const servicesArray = data?.homeaddcard || [];
        
        console.log('Services data:', servicesArray);
        
        setServices(servicesArray.map((item: any) => {
          const imgUrl = item.badge_img?.[0]?.url;
          console.log('Image URL:', imgUrl);
          return {
            id: item.id,
            title: item.title,
            badge_img: formatImageUrl(imgUrl)
          };
        }));
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="w-full bg-[#1e7f4f] py-8"><div className="text-center text-white">Loading...</div></div>;

  return (
    <div className="w-full md:h-14.5 bg-[#1e7f4f] py-4 md:py-0 relative z-50 flex items-center overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex items-center gap-6 px-6 whitespace-nowrap">
          {services.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2"
            >
              {item.badge_img && (
                <img
                  src={item.badge_img}
                  alt={item.title}
                  className="w-[13.8px] h-[13.8px] object-contain"
                />
              )}

              <h3 className="text-[17px] font-bold uppercase text-[#FFFFFF]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
}
