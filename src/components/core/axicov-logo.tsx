"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function AxicovLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = "Axicov".split("");
    container.innerHTML = "";

    letters.forEach((letter, i) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.className =
        "inline-block transition-all duration-700 opacity-0 translate-y-8";
      span.style.animationDelay = `${i * 150}ms`;
      span.style.animationFillMode = "forwards";

      // Add animation class after a small delay
      setTimeout(() => {
        span.classList.remove("opacity-0", "translate-y-8");
        span.classList.add("opacity-100", "translate-y-0");
      }, 100 + i * 150);

      container.appendChild(span);
    });
  }, []);

  return (
    <div className="relative flex items-center group transition-all duration-500 hover:scale-105">
      <div className="absolute -inset-8 bg-rose-500/20 rounded-full blur-3xl opacity-70 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>

      <div className="flex items-center relative z-10">
        {/* First part of text "Axic" */}
        <span className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white">
          Axic
        </span>

        {/* Logo in the middle */}
        <div className="relative mx-2 md:mx-3 flex items-center justify-center">
          <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="Axicov Logo"
              width={96}
              height={96}
              className="object-contain transition-all duration-500 group-hover:brightness-110"
            />
          </div>
          <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-lg -z-10 group-hover:bg-rose-500/50 transition-all duration-500"></div>
        </div>

        {/* Last part of text "v" */}
        <span className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white">
          v
        </span>
      </div>
    </div>
  );
}
