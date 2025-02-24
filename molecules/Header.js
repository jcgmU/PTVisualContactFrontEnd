// molecules/Header.js
"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Usando el componente shadcn

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Logo: Puedes reemplazar /next.svg por tu logo */}
        <Link href="/" passHref>
          <img src="/next.svg" alt="Logo" className="w-10 h-10" />
        </Link>
        <h1 className="text-2xl font-bold">Contact Center</h1>
      </div>
      <nav className="flex space-x-4">
        <Link href="/agents" passHref>
          <Button variant="outline">Agents</Button>
        </Link>
        <Link href="/customer" passHref>
          <Button variant="outline">Customers</Button>
        </Link>
      </nav>
    </header>
  );
}
