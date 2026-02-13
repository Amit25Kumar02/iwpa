/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import ConferencesPage from "./conferences/page";

export default function EventsPage() {
  const [header, setHeader] = useState<any>(null);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);
  const [conferenceHeader, setConferenceHeader] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch header
        const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/event?populate=badge_img`);
        setHeader(headerRes.data.data);
        
        // Fetch meetings - populate all fields
        try {
          const meetingsRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/eventcard?populate=*`);
          const meetingsData = meetingsRes.data.data;
          // Extract eventcarddata array from the response
          const eventsArray = meetingsData?.eventcarddata || [];
          setMeetings(eventsArray);
        } catch (meetingsError) {
          console.error('Failed to fetch meetings:', meetingsError);
          setMeetings([]);
        }
        
        // Fetch conferences
        try {
          const conferencesRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/eventconference?populate[0]=badge_img&populate[1]=eventconfcard&populate[2]=eventconfcard.img`);
          const conferencesData = conferencesRes.data.data;
          const conferencesArray = conferencesData?.eventconfcard || [];
          setConferences(conferencesArray);
          // Set conference header data
          setConferenceHeader(conferencesData);
        } catch (conferencesError) {
          console.error('Failed to fetch conferences:', conferencesError);
          setConferences([]);
        }
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <InnerPageLayout title="Events" breadcrumbs={[{ label: "Events" }]}>
        <div className="text-center py-20">Loading...</div>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout title="Events" breadcrumbs={[{ label: "Events" }]}>

      {/* 🔹 Dynamic Section Header */}
      <div className="text-center mb-8 md:mb-10 px-4">
        <span className="inline-flex items-center gap-2 text-[#1F7A4D] bg-[#1F7A4D0F] px-3 md:px-4 py-2 border border-[#1F7A4D0F] rounded text-xs md:text-sm">
          {header?.badge_img?.url && (
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${header.badge_img.url}`}
              alt="badge"
              className="w-3 h-3 md:w-4 md:h-4"
            />
          )}
          {header?.badge}
        </span>

        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#001233] font-bold mt-4">
          {header?.title}
        </h2>
      </div>

      {/* 🔹 Meetings List */}
      <div className="space-y-3 md:space-y-4 max-w-7xl mx-auto mb-12 md:mb-16 px-4">
        {meetings.length > 0 && meetings.map((event: any) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-[#E2E8F0] shadow-sm rounded-lg px-4 md:px-6 py-4 gap-3 sm:gap-0"
          >
            <div>
              <p className="font-bold text-[#0B3C5D] text-sm md:text-base">
                {event.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <Calendar className="inline mr-1 w-3 h-3" />
                {new Date(event.date).toDateString()}
              </p>
            </div>

            <a
              href={event.button_url || '#'}
              className="text-[#1F7A4D] font-semibold text-sm self-start sm:self-auto"
            >
              {event.button}<ArrowRight className="inline ml-1 w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

     <ConferencesPage />

    </InnerPageLayout>
  );
}
