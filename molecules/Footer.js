// molecules/Footer.js
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Contact Center. All rights reserved.
      </p>
    </footer>
  );
}
