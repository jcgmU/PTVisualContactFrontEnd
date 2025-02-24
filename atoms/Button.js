// atoms/Button.js
"use client";
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

export default function Button({ children, ...props }) {
  return (
    <ShadcnButton
      {...props}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </ShadcnButton>
  );
}
