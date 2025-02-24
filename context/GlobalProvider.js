"use client";
import { useState, useEffect, useCallback } from "react";
import GlobalContext from "./GlobalContext";
import { websocketService } from "@/services/websocket";
import { fetchCustomers } from "@/services/api";

export default function GlobalProvider({ children }) {
  const [clients, setClients] = useState([]);

  const refreshCustomers = useCallback(async () => {
    try {
      const data = await fetchCustomers();
      setClients(data);
      return data;
    } catch (error) {
      console.error("Error al actualizar clientes:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    // Inicializar WebSocket
    websocketService.connect();

    // Suscribirse a eventos de clientes
    websocketService.subscribe("NEW_CUSTOMER", async () => {
      await refreshCustomers();
    });

    // Cleanup
    return () => {
      websocketService.unsubscribe("NEW_CUSTOMER");
    };
  }, [refreshCustomers]);

  return (
    <GlobalContext.Provider value={{ clients, refreshCustomers }}>
      {children}
    </GlobalContext.Provider>
  );
}
