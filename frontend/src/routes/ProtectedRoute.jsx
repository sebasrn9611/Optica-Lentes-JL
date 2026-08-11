// ============================================================================
// ARCHIVO: ProtectedRoute.jsx
//
// DESCRIPCIÓN:
// Protege las rutas administrativas.
// Si no existe una sesión válida en el navegador,
// redirige al usuario hacia /login.
// ============================================================================

import {
    Navigate,
    Outlet
} from "react-router-dom";


function ProtectedRoute() {

    // Recuperamos los datos guardados al iniciar sesión.
    const storedUser =
        sessionStorage.getItem("adminUser");

        const token =
        sessionStorage.getItem("authToken");


    // Si no existe usuario, regresamos al login.
    if (!storedUser || !token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // Convertimos el JSON almacenado en un objeto JavaScript.
    let user;

    try {

        user = JSON.parse(storedUser);

    } catch {

        // Si el contenido está dañado,
        // eliminamos la sesión.
        sessionStorage.removeItem("adminUser");

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // Solo permitimos usuarios con rol ADMIN.
    if (user.role !== "ADMIN") {

        sessionStorage.removeItem("adminUser");

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    /*
     * Si todo es correcto, Outlet permite
     * mostrar las rutas administrativas hijas.
     */
    return <Outlet />;
}


export default ProtectedRoute;