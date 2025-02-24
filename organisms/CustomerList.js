"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "@/context/GlobalContext";
import CustomerCard from "@/molecules/CustomerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerList() {
  const { clients = [], refreshCustomers } = useContext(GlobalContext);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [waitTimeFilter, setWaitTimeFilter] = useState("");

  // Memoizamos la función de filtrado
  const filterCustomers = useCallback(() => {
    if (!Array.isArray(clients)) {
      console.warn("clients no es un array:", clients);
      return;
    }

    const filtered = clients.filter((customer) => {
      const nameMatch = customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const waitTimeMatch = waitTimeFilter
        ? customer.waitTime === parseInt(waitTimeFilter, 10)
        : true;
      return nameMatch && waitTimeMatch;
    });
    setFilteredCustomers(filtered);
  }, [clients, searchTerm, waitTimeFilter]);

  // Carga inicial de datos
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        if (typeof refreshCustomers === "function") {
          await refreshCustomers();
        }
        setError(null);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [refreshCustomers]);

  // Efecto para filtrar
  useEffect(() => {
    filterCustomers();
  }, [filterCustomers]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setWaitTimeFilter("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          type="search"
          placeholder="Buscar por nombre..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Filtrar por tiempo de espera (segundos)"
          className="max-w-xs"
          value={waitTimeFilter}
          onChange={(e) => setWaitTimeFilter(e.target.value)}
          min="0"
        />
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="whitespace-nowrap"
        >
          Limpiar filtros
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      ) : filteredCustomers.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No se encontraron clientes
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}
