// atoms/InputField.js
"use client";
import React from "react";
import { Input } from "@/components/ui/input";

export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium">
          {label}
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded p-2"
      />
    </div>
  );
}
