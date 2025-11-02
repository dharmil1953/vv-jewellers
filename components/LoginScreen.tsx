"use client";
import { useEffect, useState } from "react";
import ScreenWrapper from "./ScreenWrapper";

export default function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [id, setId] = useState("vvadmin");
  const [password, setPassword] = useState("gold123");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      onSuccess();
    }
  }, [onSuccess]);

  const handleLogin = () => {
    const envId = process.env.NEXT_PUBLIC_ADMIN_ID;
    const envPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (id === envId && password === envPass) {
      localStorage.setItem("isLoggedIn", "true");
      onSuccess();
    } else {
      setError("Invalid ID or Password ❌");
    }
  };

  return (
    <ScreenWrapper>
      <h2 className="text-2xl text-amber-400 font-bold mb-4 mt-2">
        Admin Login
      </h2>
      <div className="flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-56 p-2 rounded bg-transparent border border-amber-400 text-white text-center outline-none"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-56 p-2 rounded bg-transparent border border-amber-400 text-white text-center outline-none"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleLogin}
          className="mt-3 bg-amber-500 text-black font-semibold py-2 px-8 rounded-lg hover:bg-amber-400 transition"
        >
          Login
        </button>
      </div>
    </ScreenWrapper>
  );
}
