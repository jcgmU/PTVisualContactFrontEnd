"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function CustomerCard({ customer }) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center space-y-4 transition-all duration-300 shadow-md hover:shadow-lg">
      <Avatar className="h-24 w-24">
        <AvatarImage
          src="/AvatarUser.jpeg"
          alt={customer.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-primary/10">
          {customer.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">{customer.name}</h3>
        <p className="text-gray-600">{customer.email}</p>
        <p className="text-gray-600">{customer.phone}</p>
        <p className="text-sm text-gray-500">
          Tiempo de espera: {customer.waitTime}s
        </p>
      </div>

      <Button
        className="w-full"
        onClick={() => alert(`Contactando a ${customer.name}`)}
      >
        Contactar
      </Button>
    </div>
  );
}
