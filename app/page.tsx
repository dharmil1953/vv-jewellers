"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginScreen from "@/components/LoginScreen";
import InputScreen from "@/components/InputScreen";
import GoldRateDisplay from "@/components/GoldRateDisplay";

export default function HomePage() {
  const [step, setStep] = useState<"login" | "input" | "display">("login");
  const [rates, setRates] = useState({ k24: 0, k22: 0, k18: 0 });

  const handleLoginSuccess = () => setStep("input");
  const handleRatesSubmit = (newRates: typeof rates) => {
    setRates(newRates);
    setStep("display");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm relative"
          >
            <LoginScreen onSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm relative"
          >
            <InputScreen onSubmit={handleRatesSubmit} />
          </motion.div>
        )}

        {step === "display" && (
          <motion.div
            key="display"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm relative"
          >
            <GoldRateDisplay rates={rates} onPrevious={() => setStep("input")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
