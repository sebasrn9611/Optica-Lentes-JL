// ============================================================================
// ARCHIVO: api.js
//
// DESCRIPCIÓN:
// Configuración central de Axios.
// Agrega automáticamente el JWT a las peticiones protegidas.
// ============================================================================

import axios from "axios";


// En desarrollo usamos la ruta relativa /api. Vite la redirige al backend
// Spring Boot, evitando que el navegador tenga que comunicarse con otro origen.
// En produccion se puede reemplazar mediante VITE_API_URL.
const apiBaseUrl = (
    import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");


// ============================================================================
// INSTANCIA AXIOS
// ============================================================================

const api = axios.create({

    // Dirección base del backend Spring Boot.
    baseURL: apiBaseUrl,

    // Tiempo máximo de espera.
    timeout: 5000

});


// ============================================================================
// INTERCEPTOR DE PETICIONES
// ============================================================================

api.interceptors.request.use(

    (config) => {

        // Recuperamos el token generado durante el Login.
        const token =
            sessionStorage.getItem("authToken");


        /*
         * Si existe token, lo enviamos como:
         *
         * Authorization: Bearer eyJ...
         */
        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }


        return config;
    },

    (error) => {

        return Promise.reject(error);
    }

);


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default api;
