class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
  }

  connect() {
    this.ws = new WebSocket("ws://localhost:3001");

    this.ws.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.notifySubscribers(data);
    };

    this.ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      // Reconectar después de 5 segundos
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
  }

  unsubscribe(event, callback) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).delete(callback);
    }
  }

  notifySubscribers(data) {
    if (data.type && this.subscribers.has(data.type)) {
      this.subscribers.get(data.type).forEach((callback) => callback(data));
    }
  }
}

export const websocketService = new WebSocketService();
