"use client";
import React from "react";
import Image from "next/image";
import ChoiceCard from "@/molecules/ChoiceCard";

// Forzar revalidación en cada request
export const dynamic = "force-dynamic";

// Función para obtener datos iniciales

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-8 space-y-8">
        <h2 className="text-3xl font-bold">Welcome to Contact Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChoiceCard type="agent" />
          <ChoiceCard type="customer" />
        </div>
      </main>
    </div>
  );
}
