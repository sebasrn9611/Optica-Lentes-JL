// ============================================================================
// ARCHIVO: main.jsx
//
// DESCRIPCIÓN:
// Punto de entrada de la aplicación.
// BrowserRouter habilita la navegación entre diferentes páginas.
// ============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter controla las rutas de la aplicación */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
