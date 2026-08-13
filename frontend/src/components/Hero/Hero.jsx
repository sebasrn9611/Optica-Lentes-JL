// ============================================================================
// ARCHIVO: Hero.jsx
//
// DESCRIPCIÓN:
// Sección principal de la página de Óptica Lentes J.L.
// Presenta el servicio principal, los beneficios, las acciones
// y una imagen profesional relacionada con la optometría.
// ============================================================================

// Importamos los estilos exclusivos del componente.
import "./Hero.css";
import { useState } from "react";
import AppointmentBooking from "../AppointmentBooking/AppointmentBooking";

// Importamos la imagen profesional del Hero.
import heroOptometrista from "../../assets/images/hero/hero-optometrista.png";


// Importamos los iconos utilizados.
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaEye
} from "react-icons/fa";

// Creamos el componente Hero.
function Hero() {
    const [appointmentOpen, setAppointmentOpen] = useState(false);

    return (
        <>
            <section className="hero" id="inicio">

            {/* Contenedor de las dos columnas principales */}
            <div className="hero-container">

                {/* =========================================================
                    COLUMNA IZQUIERDA: INFORMACIÓN
                   ========================================================= */}
                <div className="hero-content">

                    {/* Etiqueta superior */}
                    <span className="hero-badge">
                        <FaEye />
                        Cuidado visual profesional
                    </span>

                    {/* Título principal */}
                    <h1>
                        Control anual de optometría
                    </h1>

                    {/* Descripción del servicio */}
                    <p className="hero-description">
                        En Óptica Lentes J.L. realizamos evaluaciones visuales
                        completas para detectar oportunamente alteraciones,
                        actualizar tu fórmula y brindarte una atención
                        personalizada.
                    </p>

                    {/* Lista de beneficios */}
                    <div className="hero-benefits">

                        {/* Beneficio 1 */}
                        <div className="hero-benefit">
                            <FaCheckCircle />
                            <span>
                                Evaluación completa de agudeza visual
                            </span>
                        </div>

                        {/* Beneficio 2 */}
                        <div className="hero-benefit">
                            <FaCheckCircle />
                            <span>
                                Graduación y formulación actualizada
                            </span>
                        </div>

                        {/* Beneficio 3 */}
                        <div className="hero-benefit">
                            <FaCheckCircle />
                            <span>
                                Asesoramiento personalizado
                            </span>
                        </div>

                    </div>

                    {/* Botones principales */}
                    <div className="hero-buttons">

                        {/* Más adelante abrirá el formulario de citas */}
                        <button
                            type="button"
                            className="hero-button hero-button-primary"
                            onClick={() => setAppointmentOpen(true)}
                        >
                            <FaCalendarAlt />
                            Agendar cita
                        </button>

                        {/* Lleva al usuario hasta la sección de servicios */}
                        <a
                            href="#servicios"
                            className="hero-button hero-button-secondary"
                        >
                            <FaEye />
                            Ver servicios
                        </a>

                    </div>

                    {/* Indicadores de confianza */}
                    <div className="hero-stats">

                        {/* Indicador 1 */}
                        <div className="hero-stat">
                            <strong>Atención</strong>
                            <span>Personalizada</span>
                        </div>

                        {/* Indicador 2 */}
                        <div className="hero-stat">
                            <strong>Calidad</strong>
                            <span>En productos y servicios</span>
                        </div>

                        {/* Indicador 3 */}
                        <div className="hero-stat">
                            <strong>Confianza</strong>
                            <span>Para cuidar tu visión</span>
                        </div>

                    </div>

                </div>

                {/* =========================================================
                    COLUMNA DERECHA: IMAGEN PROFESIONAL
                   ========================================================= */}
                <div className="hero-visual">

                    {/* Imagen relacionada con el servicio de optometría */}
                    <img
                        src={heroOptometrista}
                        alt="Profesional de optometría usando gafas en un consultorio"
                        className="hero-image"
                    />

                </div>

            </div>

            </section>
            <AppointmentBooking
                open={appointmentOpen}
                onClose={() => setAppointmentOpen(false)}
            />
        </>
    );
}

// Exportamos el componente.
export default Hero;
