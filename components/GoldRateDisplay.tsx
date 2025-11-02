"use client";
import { useState, useEffect, useRef } from "react";
import logoImage from "@/public/assets/logo.png";
import backgroundImg from "@/public/assets/bg-image.jpg";
import domtoimage from "dom-to-image";

type RateKeys = "k24" | "k22" | "k18";

interface Rates {
  k24: number;
  k22: number;
  k18: number;
}

export default function GoldRateDisplay({
  rates,
  onPrevious,
}: {
  rates: { k24: number; k22: number; k18: number };
  onPrevious: () => void;
}) {
  const [dateInfo, setDateInfo] = useState({ date: "", day: "" });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN");
    const formattedDay = now.toLocaleDateString("en-IN", { weekday: "long" });
    setDateInfo({ date: formattedDate, day: formattedDay });
  }, []);

  const addLabour = (base: number) => base * 1.125;
  const addGST = (base: number) => addLabour(base) * 1.03;

  const k22WithLab = addLabour(rates.k22);
  const k18WithLab = addLabour(rates.k18);
  const k22WithGST = addGST(rates.k22);
  const k18WithGST = addGST(rates.k18);

  //   const handleDownload = async () => {
  //     if (!cardRef.current) return;

  //     try {
  //       const canvas = await html2canvas(cardRef.current, {
  //         scale: 2,
  //         backgroundColor: "#000000",
  //         useCORS: true,
  //         logging: false,
  //       });

  //       const link = document.createElement("a");
  //       link.download = `VV-Gold-Rate-${dateInfo.date.replace(/\//g, "-")}.png`;
  //       link.href = canvas.toDataURL("image/png");
  //       link.click();
  //     } catch (err) {
  //       console.error("Download error:", err);
  //       alert("Failed to generate image.");
  //     }
  //   };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await domtoimage.toPng(cardRef.current, {
        quality: 1,
        bgcolor: "#000000",
        width: cardRef.current.scrollWidth * 2,
        height: cardRef.current.scrollHeight * 2,
        style: { transform: "scale(2)", transformOrigin: "top left" },
      });

      const link = document.createElement("a");
      link.download = `VV-Gold-Rate-${dateInfo.date.replace(/\//g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div
          ref={cardRef}
          className="w-full max-w-sm mx-auto relative rounded-xl overflow-hidden shadow-lg"
        >
          {/* Background Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${backgroundImg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="relative z-10 text-center">
            {/* Header */}
            <div className="flex justify-between items-start px-4 pt-2">
              <span style={{ color: "#fde68a", fontSize: "0.75rem" }}>
                {dateInfo.date}
              </span>
              <div className="w-16 h-16 relative">
                <img
                  src={logoImage.src}
                  alt="VV Jewels Logo"
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              <span style={{ color: "#fde68a", fontSize: "0.75rem" }}>
                {dateInfo.day}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-serif">
              TODAY'S GOLD RATE
            </h2>

            <div className="mt-3">
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                }}
              >
                24k GOLD
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white">
                {rates.k24.toLocaleString("en-IN")}
                <span className="text-2xl">/-</span>
              </div>
              <div
                style={{ color: "#9ca3af", fontSize: "0.75rem" }}
                className="mt-1"
              >
                (+3% GST) Per 10grams
              </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center my-2">
              <div className="flex items-center w-10/12">
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0), rgb(217,119,6), rgb(217,119,6))",
                  }}
                ></div>

                <div
                  style={{ color: "#f59e0b", fontSize: "0.875rem" }}
                  className="px-2"
                >
                  ● ● ●
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to left, rgba(0,0,0,0), rgb(217,119,6), rgb(217,119,6))",
                  }}
                ></div>
              </div>
            </div>

            {/* 22K & 18K */}
            <div className="grid grid-cols-2 gap-6 px-4">
              {/* 22K */}
              <div>
                <div
                  style={{
                    color: "#f59e0b",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                  }}
                >
                  22k GOLD
                </div>
                <div className="text-2xl font-bold text-white">
                  {rates.k22.toLocaleString("en-IN")}
                  <span className="text-lg">/-</span>
                </div>
                <div
                  style={{ color: "#9ca3af", fontSize: "0.75rem" }}
                  className="mt-1"
                >
                  +12.50% (Labour)
                </div>
              </div>

              {/* 18K */}
              <div>
                <div
                  style={{
                    color: "#f59e0b",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                  }}
                >
                  18k GOLD
                </div>
                <div className="text-2xl font-bold text-white">
                  {rates.k18.toLocaleString("en-IN")}
                  <span className="text-lg">/-</span>
                </div>
                <div
                  style={{ color: "#9ca3af", fontSize: "0.75rem" }}
                  className="mt-1"
                >
                  +12.50% (Labour)
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-2">
              <div className="grid grid-cols-2 gap-8 px-4">
                <div
                  style={{ height: "1px", backgroundColor: "#4b5563" }}
                ></div>
                <div
                  style={{ height: "1px", backgroundColor: "#4b5563" }}
                ></div>
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
                <div style={{ color: "#f59e0b", fontSize: "1.125rem" }}>
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
                <div style={{ color: "#f59e0b", fontSize: "1.125rem" }}>
                  +{(rates.k18 * 1.125 * 0.03).toFixed(0)}/-
                </div>
              </div>

              {/* Center Text */}
              <div className="absolute left-1/2 -translate-x-1/2 text-center">
                <div
                  style={{
                    color: "#fde68a",
                    fontSize: "0.625rem",
                    lineHeight: "1.2",
                  }}
                >
                  Gold rate <br /> with Labour
                </div>
                <div
                  style={{
                    color: "#fde68a",
                    fontSize: "0.625rem",
                    lineHeight: "1.2",
                    marginTop: "0.25rem",
                  }}
                >
                  (+3% GST) <br /> Per 10grams
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-2">
              <div className="grid grid-cols-2 gap-8 px-4">
                <div
                  style={{ height: "1px", backgroundColor: "#4b5563" }}
                ></div>
                <div
                  style={{ height: "1px", backgroundColor: "#4b5563" }}
                ></div>
              </div>
            </div>

            {/* Final Rates */}
            <div className="grid grid-cols-2 gap-6 px-4 pb-2">
              <div>
                <div
                  style={{
                    color: "#fde68a",
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                  }}
                >
                  {k22WithGST.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                  <span className="text-base">/-</span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#fde68a",
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                  }}
                >
                  {k18WithGST.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                  <span className="text-base">/-</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-2">
              <div className="flex items-center w-10/12">
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0), rgb(217,119,6), rgb(217,119,6))",
                  }}
                ></div>

                <div
                  style={{ color: "#f59e0b", fontSize: "0.875rem" }}
                  className="px-2"
                >
                  ● ● ●
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to left, rgba(0,0,0,0), rgb(217,119,6), rgb(217,119,6))",
                  }}
                ></div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-5 text-center">
              <div style={{ color: "white", fontSize: "0.75rem" }}>
                02 Binori B square, 3, Sindhubhavan Road,
              </div>
              <div style={{ color: "white", fontSize: "0.75rem" }}>
                Ahmedabad, Gujarat
              </div>

              {/* Social Icons + Contact */}
              <div className="mt-3 flex justify-center items-center gap-6 text-xs">
                {/* Facebook */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ width: "1rem", height: "1rem", color: "#f59e0b" }}
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2 .9 0 1.8.1 2 .1v2.3h-1.1c-1 0-1.3.6-1.3 1.2V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12Z" />
                  </svg>
                  <span style={{ color: "white" }}>jewelsvv</span>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ width: "1rem", height: "1rem", color: "#f59e0b" }}
                  >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" />
                  </svg>
                  <span style={{ color: "white" }}>@jewelsvv</span>
                </div>

                {/* Call */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ width: "1rem", height: "1rem", color: "#f59e0b" }}
                  >
                    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3c1.1.3 2.3.5 3.6.5a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1C10.7 21.8 2.2 13.3 2.2 3.9a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1c0 1.3.2 2.5.5 3.6a1 1 0 0 1-.3 1L6.6 10.8Z" />
                  </svg>
                  <span style={{ color: "white" }}>87809 33241</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons – OUTSIDE cardRef → safe to use Tailwind */}
      <div className="flex justify-between items-center px-6 pb-6 mt-4">
        <button
          onClick={onPrevious}
          className="border border-amber-400 text-amber-400 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-amber-400 hover:text-black"
        >
          Previous
        </button>

        <button
          onClick={handleDownload}
          className="border border-amber-400 text-amber-400 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-amber-400 hover:text-black"
        >
          Download
        </button>
      </div>
    </>
  );
}
