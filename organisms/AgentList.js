"use client";
import { useState, useEffect, useContext } from "react";
import { fetchAgents } from "@/services/api";
import GlobalContext from "@/context/GlobalContext";
import AgentCard from "@/molecules/AgentCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function AgentList() {
  const { agents = [] } = useContext(GlobalContext); // Proporcionamos un valor por defecto
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar agentes iniciales
  useEffect(() => {
    const loadAgents = async () => {
      try {
        setLoading(true);
        const data = await fetchAgents(status ? { status } : {});
        setFilteredAgents(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando agentes:", err);
        setError(err.message);
        setFilteredAgents([]);
      } finally {
        setLoading(false);
      }
    };
    loadAgents();
  }, [status]);

  // Filtrar agentes
  useEffect(() => {
    if (!Array.isArray(agents)) {
      console.warn("agents no es un array:", agents);
      return;
    }

    const filtered = agents.filter((agent) => {
      const nameMatch = agent.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const statusMatch = status ? agent.status === status : true;
      return nameMatch && statusMatch;
    });

    setFilteredAgents(filtered);
  }, [searchTerm, agents, status]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <Input
          type="search"
          placeholder="Buscar por nombre..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={status} onValueChange={setStatus} className="max-w-xs">
          <option value="">Todos</option>
          <option value="ACTIVE">Activo</option>
          <option value="PENDING">Pendiente</option>
          <option value="INACTIVE">Inactivo</option>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      ) : filteredAgents.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No se encontraron agentes
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
