"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AgentCard({ agent }) {
  const statusColors = {
    ACTIVE: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    INACTIVE: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="border rounded-lg p-6 flex flex-col items-center space-y-4 transition-all duration-300 shadow-md hover:shadow-lg">
      <Avatar className="h-24 w-24">
        <AvatarImage
          src="/AvatarAgent.jpeg"
          alt={agent.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-primary/10">
          {agent.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">{agent.name}</h3>
        <p className="text-gray-600">{agent.email}</p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            statusColors[agent.status]
          }`}
        >
          {agent.status}
        </span>
        <p className="text-sm text-gray-500">
          Tiempo de espera: {agent.waitTime}s
        </p>
      </div>

      <Button
        className="w-full"
        onClick={() => alert(`Llamando a ${agent.name}`)}
      >
        Llamar
      </Button>
    </div>
  );
}
