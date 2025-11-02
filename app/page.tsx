"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoImage from "@/public/assets/logo.png";

export default function Home() {
  // --- States ---
  const [rates, setRates] = useState({
    k24: 120800,
    k22: 111136,
    k18: 91808,
  });
  const [dateInfo, setDateInfo] = useState({ date: "", day: "" });

  // --- Date & Day Auto Update ---
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN");
    const formattedDay = now.toLocaleDateString("en-IN", { weekday: "long" });
    setDateInfo({ date: formattedDate, day: formattedDay });
  }, []);

  // --- Handle Inline Edit ---
  const handleEdit = (key, value) => {
    if (!/^\d{1,6}$/.test(value)) return; // allow up to 6 digits
    const num = Number(value);
    if (num <= 0) return;
    setRates((prev) => ({ ...prev, [key]: num }));
  };

  // --- Calculations ---
  const addLabour = (base) => base * 1.125;
  const addGST = (base) => addLabour(base) * 1.03;

  const k22WithLab = addLabour(rates.k22);
  const k18WithLab = addLabour(rates.k18);
  const k22WithGST = addGST(rates.k22);
  const k18WithGST = addGST(rates.k18);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto relative rounded-xl overflow-hidden shadow-lg">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599992836360-f88e279f8350?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 text-center">
          {/* Header */}
          <div className="flex justify-between items-start px-4 pt-2">
            <span className="text-amber-200 text-xs sm:text-sm">
              {dateInfo.date}
            </span>
            <div className="w-16 h-16 relative">
              <Image
                src={logoImage}
                alt="VV Jewels Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-amber-200 text-xs sm:text-sm">
              {dateInfo.day}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-serif">
            TODAY'S GOLD RATE
          </h2>

          {/* 24K Section */}
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">
              24k GOLD
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white">
              <input
                type="text"
                value={rates.k24}
                onChange={(e) => handleEdit("k24", e.target.value)}
                className="bg-transparent text-center outline-none w-32"
              />
              <span className="text-2xl">/-</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">
              (+3% GST) Per 10grams
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center my-2">
            <div className="flex items-center w-10/12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600 to-amber-600"></div>
              <div className="px-2 text-amber-500 text-sm">◉ ◉ ◉</div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-600 to-amber-600"></div>
            </div>
          </div>

          {/* 22K & 18K */}
          <div className="grid grid-cols-2 gap-6 px-4">
            {/* 22K */}
            <div>
              <div className="text-xl text-amber-400 font-semibold">
                22k GOLD
              </div>
              <div className="text-2xl font-bold text-white">
                <input
                  type="text"
                  value={rates.k22}
                  onChange={(e) => handleEdit("k22", e.target.value)}
                  className="bg-transparent text-center outline-none w-24"
                />
                <span className="text-lg">/-</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">+12.50% (Lab)</div>
            </div>

            {/* 18K */}
            <div>
              <div className="text-xl text-amber-400 font-semibold">
                18k GOLD
              </div>
              <div className="text-2xl font-bold text-white">
                <input
                  type="text"
                  value={rates.k18}
                  onChange={(e) => handleEdit("k18", e.target.value)}
                  className="bg-transparent text-center outline-none w-24"
                />
                <span className="text-lg">/-</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">+12.50% (Lab)</div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-2">
            <div className="grid grid-cols-2 gap-8 px-4">
              <div className="h-px bg-gray-600"></div>
              <div className="h-px bg-gray-600"></div>
            </div>
          </div>

          {/* Labour Section */}
          <div className="relative grid grid-cols-2 gap-6 px-4 mt-3">
            {/* Left */}
            <div>
              <div className="text-2xl font-bold text-white">
                {k22WithLab.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
                <span className="text-sm">/-</span>
              </div>
              <div className="text-lg text-amber-400">
                +{(rates.k22 * 1.125 * 0.03).toFixed(0)}/-
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="text-2xl font-bold text-white">
                {k18WithLab.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
                <span className="text-sm">/-</span>
              </div>
              <div className="text-lg text-amber-400">
                +{(rates.k18 * 1.125 * 0.03).toFixed(0)}/-
              </div>
            </div>

            {/* Center Text */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="text-[10px] text-amber-300 leading-tight -pt-1 pb-2">
                Gold rate <br /> with Labour
              </div>
              <div className="text-[10px] text-amber-300 mt-1 leading-tight">
                (+3% GST) <br /> Per 10grams
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-2">
            <div className="grid grid-cols-2 gap-8 px-4">
              <div className="h-px bg-gray-600"></div>
              <div className="h-px bg-gray-600"></div>
            </div>
          </div>

          {/* Final Rates */}
          <div className="grid grid-cols-2 gap-6 px-4 pb-2">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-300">
                {k22WithGST.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
                <span className="text-base">/-</span>
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-300">
                {k18WithGST.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
                <span className="text-base">/-</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center my-3">
            <div className="flex items-center w-10/12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600 to-amber-600"></div>
              <div className="px-2 text-amber-500 text-sm">◉ ◉ ◉</div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-600 to-amber-600"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pb-5 text-center">
            <div className="text-xs text-white">
              02 Binori B square, 3, Sindhubhavan Road,
            </div>
            <div className="text-xs text-white">Ahmedabad, Gujarat</div>

            {/* Social Icons + Contact */}
            <div className="mt-3 flex justify-center items-center gap-6 text-white text-xs">
              {/* Facebook */}
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-amber-400"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2 .9 0 1.8.1 2 .1v2.3h-1.1c-1 0-1.3.6-1.3 1.2V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12Z" />
                </svg>
                <span>jewelsvv</span>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-amber-400"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" />
                </svg>
                <span>@jewelsvv</span>
              </div>

              {/* Call */}
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-amber-400"
                >
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3c1.1.3 2.3.5 3.6.5a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1C10.7 21.8 2.2 13.3 2.2 3.9a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1c0 1.3.2 2.5.5 3.6a1 1 0 0 1-.3 1L6.6 10.8Z" />
                </svg>
                <span>87809 33241</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
