"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, User } from "lucide-react";

interface Post {
  id: number;
  heading: string;
  author: string;
  date: string;
  button: string;
  button_url: string | null;
  img?: string;
}

interface SectionHeader {
  badge: string;
  badge_img?: string;
  title: string;
}

export default function PublicationsSection() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [header, setHeader] = useState<SectionHeader | null>(null);

  // Fetch Section Header and Posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/homepublication?populate[0]=badge_img&populate[1]=publicationcard&populate[2]=publicationcard.img`);
        const d = res.data.data;
        
        setHeader({
          badge: d.badge,
          badge_img: d.badge_img?.url ? `${API}${d.badge_img.url}` : undefined,
          title: d.title,
        });
        
        // Extract posts from publicationcard array
        const postsArray = d.publicationcard?.map((card: any) => ({
          ...card,
          img: card.img?.url ? `${API}${card.img.url}` : undefined,
        })) || [];
        setPosts(postsArray);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge from API */}
        {header?.badge && (
          <span className="inline-flex items-center gap-2 bg-[#0B6B3A14] text-[#0B6B3A] px-4 py-2 rounded-md text-sm font-medium mb-4">
            {header.badge_img && (
              <img
                src={header.badge_img}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {header.badge}
          </span>
        )}

        {/* Title from API */}
        {header?.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
            {header.title}
          </h2>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] text-left"
            >
              {post.img && (
                <img
                  src={post.img}
                  alt={post.heading}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <User size={14} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} /> {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-[#0F172A] mb-4">
                  {post.heading}
                </h3>

                <Link
                  href={post.button_url || "#"}
                  className="text-[#0B6B3A] font-medium text-sm"
                >
                  {post.button}<ArrowUpRight className="inline ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-12">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 bg-[#0B6B3A] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            View All Updates<ArrowUpRight className="inline w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
