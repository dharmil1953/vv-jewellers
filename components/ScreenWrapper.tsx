"use client";
import Image from "next/image";
import logoImage from "@/public/assets/logo.png";

export default function ScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599992836360-f88e279f8350?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Foreground content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 relative">
            <Image
              src={logoImage}
              alt="VV Jewels Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Actual content */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
