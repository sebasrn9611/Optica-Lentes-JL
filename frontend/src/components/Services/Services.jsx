// ============================================================================
// ARCHIVO: Services.jsx
//
// DESCRIPCIÓN:
// Este componente muestra los principales servicios de la óptica mediante
// tarjetas (cards). Cada tarjeta representa un servicio.
// ============================================================================

// Importamos los estilos del componente.
import "./Services.css";

// Importamos iconos desde React Icons.
import {
    FaEye,
    FaGlasses,
    FaUserMd
} from "react-icons/fa";

// Creamos el componente.
function Services() {

    return (

        /* 
        El id permite que el botón "Ver servicios"
        del Hero lleve al usuario hasta esta sección.
        */
        <section className="services" id="servicios">

            {/* Título */}
            <h2>Nuestros Servicios</h2>

            {/* Descripción */}
            <p className="services-description">

                Ofrecemos soluciones visuales con tecnología moderna
                y atención personalizada.

            </p>

            {/* Contenedor de tarjetas */}
            <div className="services-container">

                {/* Tarjeta 1 */}
                <div className="service-card">

                    <FaEye className="service-icon"/>

                    <h3>Examen Visual</h3>

                    <p>
                        Evaluación completa de tu salud visual.
                    </p>

                </div>

                {/* Tarjeta 2 */}
                <div className="service-card">

                    <FaGlasses className="service-icon"/>

                    <h3>Monturas Modernas</h3>

                    <p>
                        Gran variedad de estilos para todas las edades.
                    </p>

                </div>

                {/* Tarjeta 3 */}
                <div className="service-card">

                    <FaUserMd className="service-icon"/>

                    <h3>Asesoría Profesional</h3>

                    <p>
                        Nuestro personal te ayudará a elegir la mejor opción.
                    </p>

                </div>

            </div>

        </section>

    );

}

// Exportamos el componente.
export default Services;