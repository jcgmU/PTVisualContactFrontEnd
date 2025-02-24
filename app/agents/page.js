// app/agents/page.js
"use client";
import React from "react";
import AgentList from "@/organisms/AgentList";

export default function AgentsPage() {
  return (
    <section className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Gestión de Agentes</h1>
      <AgentList />
    </section>
  );
}
