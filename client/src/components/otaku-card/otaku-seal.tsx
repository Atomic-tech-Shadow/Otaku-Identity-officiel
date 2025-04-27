import React from "react";

interface OtakuSealProps {
  className?: string;
}

export function OtakuSeal({ className }: OtakuSealProps) {
  return (
    <div
      className={`absolute w-20 h-20 opacity-15 z-0 ${className || "right-6 bottom-6"}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%233B82F6' stroke-width='2'/%3E%3Cpath d='M50 5 L55 25 L75 10 L65 30 L90 30 L70 40 L90 55 L65 50 L75 75 L55 60 L50 85 L45 60 L25 75 L35 50 L10 55 L30 40 L10 30 L35 30 L25 10 L45 25 Z' fill='none' stroke='%233B82F6' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%233B82F6' stroke-width='1'/%3E%3Ctext x='50' y='54' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='9' fill='%233B82F6'%3EOTAKU%3C/text%3E%3C/svg%3E")`,
        backgroundSize: "contain",
      }}
    />
  );
}
