"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { FileText, ExternalLink } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

interface MediaItem {
  id: number;
  title: string;
  document_title: string;
  document_url: string;
  img?: string;
}

interface MediaData {
  badge: string;
  badge_img?: string;
  title: string;
  mediacard: MediaItem[];
}

export default function MediaPage() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`${API}/api/media?populate[0]=badge_img&populate[1]=mediacard&populate[2]=mediacard.img&populate[3]=mediacard.document`);
        const d = res.data.data;

        setData({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.url),
          title: d.title,
          mediacard: d.mediacard?.map((item: any) => {
            const docUrl = item.document?.url || item.document_url;
            return {
              id: item.id,
              title: item.title,
              document_title: item.document_title,
              document_url: formatImageUrl(docUrl),
              img: formatImageUrl(item.img?.url),
            };
          }) || [],
        });
      } catch (error) {
        console.error("Media fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [API]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!data) return null;

  return (
    <InnerPageLayout title="Media" breadcrumbs={[{ label: "Publications" }, { label: "Media" }]}>
      <div className="text-center my-12">
        {data.badge && (
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.86px] border-[#1F7A4D33] text-[#1F7A4D] px-4 py-2 rounded-md text-sm font-medium mb-4">
            {data.badge_img && (
              <img src={data.badge_img} alt="badge" className="w-4 h-4" />
            )}
            {data.badge}
          </span>
        )}
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[#001233]">
            {data.title}
          </h2>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
        {data.mediacard.length > 0 ? (
          data.mediacard.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 "
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <FileText size={48} className="text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  {item.document_url && item.document_url !== '' && (
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1F7A4D] hover:text-[#0B6B3A] transition"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.document_title}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No media items available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later for updates.</p>
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
}
