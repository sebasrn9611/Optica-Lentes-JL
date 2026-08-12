// ============================================================================
// ARCHIVO: api.js
//
// DESCRIPCIÓN:
// Configuración central de Axios.
// Agrega automáticamente el JWT a las peticiones protegidas.
// ============================================================================

import axios from "axios";


// ============================================================================
// INSTANCIA AXIOS
// ============================================================================

const api = axios.create({

    // Dirección base del backend Spring Boot.
    baseURL: import.meta.env.VITE_API_URL,

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