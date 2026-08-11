// ============================================================================
// ARCHIVO: AdminLayout.jsx
//
// DESCRIPCIÓN:
// Layout principal del área administrativa.
// Mantiene visible el menú lateral mientras cambia el contenido interno.
// ============================================================================

import { useState } from "react";

import {
    NavLink,
    Outlet,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaBars,
    FaBoxOpen,
    FaCalendarAlt,
    FaChartLine,
    FaDollarSign,
    FaGlasses,
    FaHome,
    FaSignOutAlt,
    FaTimes,
    FaUsers
} from "react-icons/fa";

import logoOptica from "../assets/logo/logo-optica-transparente.png";

import "../pages/Admin/Admin.css";


// ============================================================================
// OPCIONES DEL MENÚ ADMINISTRATIVO
// ============================================================================

const menuItems = [

    {
        path: "/admin",
        label: "Resumen general",
        icon: <FaHome />,
        end: true
    },

    {
        path: "/admin/products",
        label: "Productos",
        icon: <FaGlasses />
    },

    {
        path: "/admin/citas",
        label: "Citas",
        icon: <FaCalendarAlt />
    },

    {
        path: "/admin/clientes",
        label: "Clientes",
        icon: <FaUsers />
    },

    {
        path: "/admin/ventas",
        label: "Ventas",
        icon: <FaDollarSign />
    },

    {
        path: "/admin/inventario",
        label: "Inventario",
        icon: <FaBoxOpen />
    },

    {
        path: "/admin/reportes",
        label: "Reportes",
        icon: <FaChartLine />
    }

];


// ============================================================================
// COMPONENTE ADMIN LAYOUT
// ============================================================================

function AdminLayout() {

    // Permite abrir o cerrar el menú en pantallas pequeñas.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Permite conocer la ruta actual.
    const location = useLocation();

    // Permite navegar mediante JavaScript.
    const navigate = useNavigate();


    // =========================================================================
    // IDENTIFICAR LA SECCIÓN ACTIVA
    // =========================================================================

    const activeLabel =
        menuItems.find((item) => {

            if (item.end) {
                return location.pathname === item.path;
            }

            return location.pathname.startsWith(item.path);

        })?.label ?? "Panel administrativo";


    // =========================================================================
    // CERRAR SESIÓN
    // =========================================================================

    const handleLogout = () => {

        // Eliminamos la información de la sesión administrativa.
        sessionStorage.removeItem("adminUser");
        
        // Eliminamos también el JWT.
        sessionStorage.removeItem("authToken");

        // Cerramos el menú si estaba abierto.
        setIsMenuOpen(false);

        // Regresamos al Login.
        navigate("/login", {
            replace: true
        });
    };


    // =========================================================================
    // INTERFAZ
    // =========================================================================

    return (

        <div className="admin-page">

            {/* ==============================================================
                OVERLAY PARA CELULAR
               ============================================================== */}

            {isMenuOpen && (

                <button
                    className="admin-overlay"
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar menú"
                />

            )}


            {/* ==============================================================
                MENÚ LATERAL
               ============================================================== */}

            <aside
                className={
                    `admin-sidebar${
                        isMenuOpen
                            ? " admin-sidebar--open"
                            : ""
                    }`
                }
            >

                {/* Logo */}
                <div className="admin-brand">

                    <img
                        src={logoOptica}
                        alt="Óptica Lentes J.L"
                    />

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Cerrar menú lateral"
                    >
                        <FaTimes />
                    </button>

                </div>


                {/* Perfil */}
                <div className="admin-profile">

                    <div className="admin-profile-avatar">
                        AD
                    </div>

                    <div>
                        <strong>
                            Administrador
                        </strong>

                        <span>
                            Panel de control
                        </span>
                    </div>

                </div>


                {/* ==========================================================
                    NAVEGACIÓN
                   ========================================================== */}

                <nav
                    className="admin-menu"
                    aria-label="Menú administrativo"
                >

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >

                            <span aria-hidden="true">
                                {item.icon}
                            </span>

                            {item.label}

                        </NavLink>

                    ))}

                </nav>


                {/* ==========================================================
                    CERRAR SESIÓN
                   ========================================================== */}

                <button
                    className="admin-logout"
                    type="button"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt aria-hidden="true" />

                    <span>
                        Cerrar sesión
                    </span>

                </button>

            </aside>


            {/* ==============================================================
                CONTENIDO PRINCIPAL
               ============================================================== */}

            <main className="admin-main">

                {/* Encabezado */}
                <header className="admin-header">

                    {/* Botón menú móvil */}
                    <button
                        className="admin-menu-toggle"
                        type="button"
                        onClick={() =>
                            setIsMenuOpen(true)
                        }
                        aria-label="Abrir menú lateral"
                    >
                        <FaBars />
                    </button>


                    {/* Título de la sección */}
                    <div>

                        <p>
                            Panel administrativo
                        </p>

                        <h1>
                            {activeLabel}
                        </h1>

                    </div>


                    {/* Usuario */}
                    <div className="admin-header-user">

                        <span>
                            Administrador
                        </span>

                        <div>
                            AD
                        </div>

                    </div>

                </header>


                {/* ==========================================================
                    CONTENIDO DE LA RUTA HIJA
                   ========================================================== */}

                <div className="admin-content">

                    <Outlet />

                </div>

            </main>

        </div>
    );
}


// ============================================================================
// EXPORTACIÓN
// ============================================================================

export default AdminLayout;