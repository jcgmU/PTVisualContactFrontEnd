# Contact Center - Frontend

## Descripción

Interfaz de usuario para el sistema de gestión de centro de contacto, construida con **Next.js 13** y diseñada para proporcionar una experiencia fluida en la administración de agentes y clientes. Utiliza **WebSockets** para actualizaciones en tiempo real y sigue una arquitectura basada en componentes atómicos para escalabilidad y reutilización.

## Tecnologías Utilizadas

-   **Next.js 13+**
    
-   **React**
    
-   **Tailwind CSS**
    
-   **Shadcn/ui**
    
-   **WebSocket (Socket.IO)**
    

## Estructura del Proyecto

```
.
├── README.md
├── app
│   ├── agents
│   │   ├── loading.js
│   │   └── page.js
│   ├── customer
│   │   ├── loading.js
│   │   └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── loading.js
│   └── page.js
├── atoms
│   ├── Button.js
│   ├── InputField.js
│   ├── README.md
│   └── SelectField.js
├── components
│   └── ui
│       ├── alert-dialog.jsx
│       ├── avatar.jsx
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── select.jsx
│       └── textarea.jsx
├── components.json
├── context
│   ├── GlobalContext.js
│   ├── GlobalProvider.js
│   └── README.md
├── eslint.config.mjs
├── hooks
│   └── README.md
├── jsconfig.json
├── lib
│   └── utils.js
├── molecules
│   ├── AgentCard.js
│   ├── CustomerCard.js
│   ├── ChoiceCard.js
│   ├── Footer.js
│   ├── Header.js
│   └── README.md
├── next.config.mjs
├── organisms
│   ├── AgentList.js
│   ├── CreateAgentForm.js
│   ├── CreateCustomerForm.js
│   ├── CustomerList.js
│   └── README.md
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── AvatarAgent.jpeg
│   ├── AvatarUser.jpeg
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── services
│   ├── README.md
│   ├── api.js
│   └── websocket.js
└── tailwind.config.mjs
```

## Características

-   **Diseño responsive** con Tailwind CSS
    
-   **Actualizaciones en tiempo real** con WebSocket
    
-   **Formularios validados** con validaciones dinámicas
    
-   **Gestión de estado global** mediante Context API
    
-   **Componentes reutilizables** basados en arquitectura atómica
    
-   **Sistema de notificaciones** con Alert Dialog
    

## Instalación

### 1. Clonar el repositorio

```
git clone https://github.com/jcgmU/PTVisualContactFrontEnd.git
cd PTVisualContactFrontEnd
```

### 2. Instalar dependencias

```
npm install
```


### 4. Ejecutar la aplicación

Modo desarrollo:

```
npm run dev
```

Modo producción:

```
npm run build
npm start
```

## Uso

1.  Accede a la interfaz en `http://localhost:3000`
    
2.  Navega entre las secciones de **Agentes** y **Clientes**
    
3.  Utiliza los formularios para agregar nuevos registros
    
4.  Observa las actualizaciones en tiempo real mediante WebSockets
    

## Configuración WebSocket

El sistema usa **Socket.IO** para sincronizar datos en tiempo real.

### Eventos WebSocket disponibles:

-   `agentUpdated` → Notifica cambios en agentes
    
-   `customerUpdated` → Notifica cambios en clientes
    

Ejemplo de conexión WebSocket en frontend:

```
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

socket.on('agentUpdated', (data) => {
    console.log('Actualización de agentes:', data);
});
```

## Scripts Disponibles

-   `npm run dev` → Iniciar en modo desarrollo
    
-   `npm run build` → Construir la aplicación para producción
    
-   `npm start` → Ejecutar la aplicación en producción
    

## Contribuciones

1.  **Fork** el proyecto
    
2.  Crea una **nueva rama** con tu funcionalidad
    
3.  **Realiza tus cambios** y confirma (commit)
    
4.  Envía un **pull request**
    

## Licencia

Este proyecto está bajo la licencia **MIT**.

## Contacto

📧 jcgm1047@gmail.com

👨🏻‍💻 **Juan Camilo Garcia Martin**

🚀 Desarrollado con ❤️ usando **Next.js y WebSocket**
