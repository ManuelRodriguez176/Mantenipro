# ManteniPro — Sistema de Mantenimientos

Aplicación modular para gestión de mantenimientos, construida con **Vite** + **Vanilla JS** + **Firebase Auth** + **Google Sheets API**.

---

## 🗂 Estructura del proyecto

```
ManteniPro/
├── index.html                          ← HTML limpio, sin lógica inline
├── package.json
├── vite.config.js
└── src/
    ├── main.js                         ← Punto de entrada, orquesta módulos
    │
    ├── core/                           ← Infraestructura transversal
    │   ├── store.js                    ← Estado global reactivo (pub/sub)
    │   ├── router.js                   ← Navegación entre pantallas/páginas
    │   ├── toast.js                    ← Notificaciones
    │   └── firebase.js                 ← Inicialización Firebase
    │
    ├── features/                       ← Módulos por funcionalidad
    │   ├── config/
    │   │   ├── config.service.js       ← Leer/guardar config en localStorage
    │   │   └── config.view.js          ← Pantalla de configuración inicial
    │   ├── auth/
    │   │   ├── auth.service.js         ← Login/logout Firebase
    │   │   └── auth.view.js            ← Pantalla de login, chip de usuario
    │   ├── dashboard/
    │   │   ├── dashboard.service.js    ← Cálculo de estadísticas
    │   │   └── dashboard.view.js       ← Render de stats cards y tabla reciente
    │   ├── mantenimientos/
    │   │   ├── mantenimientos.service.js ← Carga Sheets, filtrado, paginación
    │   │   └── mantenimientos.view.js    ← Tabla, col-toggle, filtros, CSV
    │   ├── clientes/
    │   │   ├── clientes.service.js     ← Agrupación por cliente
    │   │   └── clientes.view.js        ← Tabla con barras de proporción
    │   └── settings/
    │       └── settings.view.js        ← Botones de reconfigurar/logout
    │
    ├── shared/                         ← Componentes y utilidades reutilizables
    │   ├── sheets.service.js           ← Fetch a Google Sheets API v4
    │   ├── table.component.js          ← Renderer de tabla genérico
    │   ├── modal.component.js          ← Modal de detalle de registro
    │   └── utils.js                    ← truncate(), exportToCSV()
    │
    └── styles/
        ├── base.css                    ← Variables CSS + reset
        ├── components.css              ← Botones, badges, toast, modal, inputs
        └── features/
            ├── config.css
            ├── auth.css
            ├── layout.css              ← Sidebar, topbar, pages
            ├── dashboard.css           ← Stat cards
            ├── table.css               ← Tabla, paginación, col-toggle
            ├── modal.css               ← Overrides del modal
            └── settings.css
```

---

## 🚀 Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Desarrollo con hot reload
npm run dev

# 3. Build para producción
npm run build

# 4. Preview del build
npm run preview
```

---

## ⚙️ Configuración

Al abrir la app por primera vez, se muestra la pantalla de configuración. Necesitas:

**Firebase:**
- API Key
- Auth Domain (`tu-proyecto.firebaseapp.com`)
- Project ID

**Google Sheets:**
- API Key de Google (activar Sheets API en console.cloud.google.com)
- Spreadsheet ID (la parte entre `/d/` y `/edit` en la URL)
- Nombre de la hoja (pestaña)
- Rango de datos (ej: `A1:Z1000`)

La configuración se guarda en `localStorage` del navegador.

---

## 🏗 Principios de arquitectura

| Principio | Implementación |
|-----------|---------------|
| **Separación de responsabilidades** | `.service.js` = lógica, `.view.js` = DOM |
| **Estado centralizado** | `core/store.js` con pub/sub simple |
| **Sin lógica en HTML** | Todos los `onclick` eliminados, eventos en JS |
| **Módulos ES** | `import/export` nativos, sin globals |
| **Feature-first** | Cada feature es autocontenida |
| **Shared reutilizable** | Tabla, modal y utils son agnósticos al dominio |
