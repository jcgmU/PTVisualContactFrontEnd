class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket("ws://localhost:3001");

    this.ws.onopen = () => {
      console.log("Conectado al WebSocket");
      this.reconnectAttempts = 0;
      // Suscribirse a eventos de agentes al conectar
      this.send({ type: "SUBSCRIBE_AGENTS" });
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifySubscribers(data);
      } catch (error) {
        console.error("Error al procesar mensaje WebSocket:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), 5000 * this.reconnectAttempts);
      }
    };

    this.ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket no está conectado");
    }
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).delete(callback);
    }
  }

  notifySubscribers(data) {
    if (data.type && this.subscribers.has(data.type)) {
      this.subscribers.get(data.type).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error("Error en callback de subscriptor:", error);
        }
      });
    }
  }
}

export const websocketService = new WebSocketService();
