"use client";
import { useState } from "react";
import ScreenWrapper from "./ScreenWrapper";

export default function InputScreen({
  onSubmit,
}: {
  onSubmit: (rates: { k24: number; k22: number; k18: number }) => void;
}) {
  const [rates, setRates] = useState({ k24: "", k22: "", k18: "" });
  const [error, setError] = useState("");

  const handleNext = () => {
    const k24 = Number(rates.k24);
    const k22 = Number(rates.k22);
    const k18 = Number(rates.k18);

    if (!k24 || !k22 || !k18) {
      setError("Please enter valid numeric values ⚠️");
      return;
    }

    onSubmit({ k24, k22, k18 });
  };

  const handleChange = (key: "k24" | "k22" | "k18", value: string) => {
    if (!/^\d{0,6}$/.test(value)) return;
    setRates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScreenWrapper>
      <h2 className="text-2xl text-amber-400 font-bold mb-4 mt-2">
        Enter Today's Gold Rates
      </h2>

      <div className="flex flex-col gap-3 text-white items-center">
        {["k24", "k22", "k18"].map((key) => (
          <label key={key} className="flex flex-col items-center">
            <span className="text-sm text-gray-300 mb-1">
              {key === "k24"
                ? "24K Gold Rate"
                : key === "k22"
                ? "22K Gold Rate"
                : "18K Gold Rate"}
            </span>
            <input
              type="text"
              value={rates[key as keyof typeof rates]}
              onChange={(e) => handleChange(key as any, e.target.value)}
              className="w-48 p-2 rounded bg-transparent border border-amber-400 text-center outline-none"
              placeholder="Enter rate"
            />
          </label>
        ))}

        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

        <button
          onClick={handleNext}
          className="mt-4 bg-amber-500 text-black font-semibold py-2 px-8 rounded-lg hover:bg-amber-400 transition"
        >
          Next →
        </button>
      </div>
    </ScreenWrapper>
  );
}
