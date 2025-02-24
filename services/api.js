// services/api.js

// Configuración base para la API
const API_BASE_URL = "http://localhost:3001";

// Función auxiliar para manejar errores HTTP
const handleApiError = async (response, resource) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Error al ${resource}: ${response.statusText}`
    );
  }
  return response.json();
};

// Función auxiliar para realizar peticiones HTTP
const fetchWithConfig = async (url, options = {}) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include", // Importante para CORS
  };

  return fetch(url, config);
};

// Funciones para Agentes
export async function fetchAgents(queryParams = {}) {
  try {
    const params = new URLSearchParams();
    if (queryParams.status) {
      params.append("status", queryParams.status);
    }

    const url = `${API_BASE_URL}/agents/list${
      params.toString() ? `?${params}` : ""
    }`;
    console.log("URL de la petición:", url);
    const response = await fetchWithConfig(url);
    const result = await handleApiError(response, "obtener agentes");
    return result.data || [];
  } catch (error) {
    console.error("Error en fetchAgents:", error);
    return [];
  }
}

export async function createAgent(agentData) {
  try {
    // Mapeo de estados desde el frontend a los del backend
    const statusMap = {
      available: "ACTIVE",
      busy: "PENDING",
      offline: "INACTIVE",
    };

    const formattedData = {
      name: agentData.name?.trim(),
      // Convertimos el estado al enum del backend, por defecto "ACTIVE" si no existe
      status: statusMap[agentData.status] || "ACTIVE",
      // Aseguramos que waitTime sea un número
      waitTime: parseInt(agentData.waitTime, 10) || 0,
    };

    // Validación mínima
    if (!formattedData.name) {
      throw new Error("El campo 'name' es obligatorio");
    }

    console.log("Datos formateados:", formattedData); // Debug log

    const response = await fetchWithConfig(`${API_BASE_URL}/agents/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const data = await handleApiError(response, "crear agente");
    console.log("Respuesta del servidor:", data); // Debug log

    return data.data;
  } catch (error) {
    console.error("Error en createAgent:", error);
    throw error;
  }
}

// Funciones para Customers
export async function fetchCustomers(queryParams = {}) {
  try {
    const params = new URLSearchParams();
    if (queryParams.waitTime) {
      params.append("waitTime", queryParams.waitTime);
    }

    // Usamos la ruta correcta del backend
    const url = `${API_BASE_URL}/customers/list${
      params.toString() ? `?${params}` : ""
    }`;

    const response = await fetchWithConfig(url);
    const data = await handleApiError(response, "obtener clientes");

    console.log("Respuesta del servidor:", data); // Debug log

    return data.data || [];
  } catch (error) {
    console.error("Error en fetchCustomers:", error);
    throw error; // Propagamos el error para manejarlo en el componente
  }
}

export async function createCustomer(customerData) {
  try {
    const formattedData = {
      name: customerData.name?.trim(),
      email: customerData.email?.trim(),
      phone: customerData.phone?.trim(),
      waitTime: parseInt(customerData.waitTime, 10) || 0,
    };

    if (!formattedData.name || !formattedData.email) {
      throw new Error("Nombre y email son requeridos");
    }

    const response = await fetchWithConfig(`${API_BASE_URL}/customers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const data = await handleApiError(response, "crear cliente");
    return data.data;
  } catch (error) {
    console.error("Error en createCustomer:", error);
    throw error;
  }
}
