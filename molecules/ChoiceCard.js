// molecules/ChoiceCard.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CreateAgentForm from "@/organisms/CreateAgentForm";
import CreateCustomerForm from "@/organisms/CreateCustomerForm";

export default function ChoiceCard({ type }) {
  // type: "agent" o "customer"
  const [showForm, setShowForm] = useState(false);

  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
  const addText = `Add ${capitalized}`;
  const deleteText = `Delete ${capitalized}`;
  const showAllText = `Show All ${capitalized}s`;

  // Corregimos las rutas de navegación
  const deleteRoute = type === "agent" ? "/agents/delete" : "/customer/delete";
  const showAllRoute = type === "agent" ? "/agents" : "/customer"; // Cambiado de customers a customer

  return (
    <div className="border rounded-lg p-8 flex flex-col items-center space-y-6 transition-all duration-300 min-h-[400px] min-w-[300px] shadow-md hover:shadow-lg">
      {!showForm ? (
        <>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={`/${type === "agent" ? "AvatarAgent" : "AvatarUser"}.jpeg`}
              alt={`${capitalized} Avatar`}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-2xl">
              {capitalized[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-4 w-full">
            <Button
              className="w-full text-center py-3 text-lg"
              onClick={() => setShowForm(true)}
            >
              {addText}
            </Button>
            <Link href={deleteRoute} className="w-full">
              <Button
                className="w-full text-center py-3 text-lg"
                variant="outline"
              >
                {deleteText}
              </Button>
            </Link>
            <Link href={showAllRoute} className="w-full">
              <Button
                className="w-full text-center py-3 text-lg"
                variant="secondary"
              >
                {showAllText}
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full">
          {type === "agent" ? (
            <CreateAgentForm onCancel={() => setShowForm(false)} />
          ) : (
            <CreateCustomerForm onCancel={() => setShowForm(false)} />
          )}
        </div>
      )}
    </div>
  );
}
