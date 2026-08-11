// ============================================================================
// ARCHIVO: Navbar.jsx
// DESCRIPCIÓN: Barra principal con navegación interna y menú para teléfonos.
// ============================================================================

// useState controla la apertura del menú móvil.
import { useState } from "react";

// Link permite abrir la página de inicio de sesión sin recargar el sitio.
import { Link } from "react-router-dom";

// Iconos para abrir y cerrar el menú desplegable.
import { FaBars, FaTimes } from "react-icons/fa";

// Logo oficial y estilos del componente.
import logoOptica from "../../assets/logo/logo-optica-transparente.png";
import "./Navbar.css";

function Navbar() {
    // Indica si el menú se encuentra abierto en pantallas pequeñas.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Cierra el menú después de seleccionar una opción.
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar" aria-label="Navegación principal">
            {/* El logo también funciona como enlace hacia el inicio. */}
            <a className="navbar-logo" href="#inicio" onClick={closeMenu}>
                <img
                    src={logoOptica}
                    alt="Ir al inicio de Óptica Lentes J.L."
                    className="logo-image"
                />
            </a>

            {/* Menú de secciones; en teléfono se transforma en desplegable. */}
            <ul
                className={`navbar-links${isMenuOpen ? " navbar-links--open" : ""}`}
                id="navbar-menu"
            >
                <li><a href="#inicio" onClick={closeMenu}>Inicio</a></li>
                <li><a href="#productos" onClick={closeMenu}>Productos</a></li>
                <li><a href="#servicios" onClick={closeMenu}>Servicios</a></li>
                <li><a href="#guia" onClick={closeMenu}>Guía</a></li>

                <li><a href="#contacto" onClick={closeMenu}>Contacto</a></li>

                {/* Acceso mostrado dentro del menú únicamente en teléfonos. */}
                <li className="navbar-mobile-login">
                    <Link to="/login" onClick={closeMenu}>Iniciar sesión</Link>
                </li>
            </ul>

            {/* Acceso de escritorio y control del menú móvil. */}
            <div className="navbar-actions">
                <Link className="btn-login" to="/login">Iniciar sesión</Link>

                <button
                    className="navbar-toggle"
                    type="button"
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="navbar-menu"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Permite cerrar el menú tocando fuera del panel. */}
            {isMenuOpen && (
                <button
                    className="navbar-overlay"
                    type="button"
                    onClick={closeMenu}
                    aria-label="Cerrar menú de navegación"
                />
            )}
        </nav>
    );
}

// Exportamos la barra para utilizarla en la página principal.
export default Navbar;
