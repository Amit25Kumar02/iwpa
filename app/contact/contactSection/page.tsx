"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { ArrowUpRight } from "lucide-react";

interface ContactData {
  badge: string;
  badge_img?: string;
  title: string;
  image: string;
}

export default function ContactSection() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [data, setData] = useState<ContactData | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    member_type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API}/api/contact?populate=*`);
      const d = res.data.data;

      setData({
        badge: d.badge,
        badge_img: d.badge_img?.url ? `${API}${d.badge_img.url}` : undefined,
        title: d.title,
        image: d.img?.url ? `${API}${d.img.url}` : "",
      });
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/api/contactsections`, { data: form });
      toast.success('Message sent successfully!');
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        member_type: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error", err);
      toast.error('Failed to send message. Please try again.');
    }

    setLoading(false);
  };

  if (!data) return null;

  return (
    <section className="bg-[#F8FAFC] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.81px] border-[#1F7A4D0F] text-[#1F7A4D] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium mb-4">
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

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={data.image}
              alt="Contact"
              className="rounded-2xl shadow-md object-cover w-full h-[300px] md:h-[420px]"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl space-y-4 order-1 lg:order-2"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base"
                required
              />
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base"
                required
              />
            </div>

            <select
              name="member_type"
              value={form.member_type}
              onChange={handleChange}
              className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 w-full text-sm md:text-base"
            >
              <option value="">Member</option>
              <option value="Member">Member</option>
              <option value="Non-Member">Non-Member</option>
              <option value="Partner">Partner</option>
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type Your Message"
              rows={4}
              className="border-[0.94px] border-[#007F5F1A] bg-[#F6F8FA] outline-none rounded-md px-3 md:px-4 py-2.5 md:py-3 w-full text-sm md:text-base"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0B6B3A] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-md font-medium hover:opacity-90 transition text-sm md:text-base w-full md:w-auto inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Message
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </section>
  );
}
