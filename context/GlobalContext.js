// context/GlobalContext.js

import { createContext } from "react";

// Definimos la forma de nuestro contexto
const GlobalContext = createContext({
  agents: [],
  clients: [],
  setAgents: () => {},
  setClients: () => {},
});

export default GlobalContext;
