"use client";
import React from "react";
import CustomerList from "@/organisms/CustomerList";

export default function CustomersPage() {
  return (
    <section className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Gestión de Clientes</h1>
      <CustomerList />
    </section>
  );
}
