// ============================================================================
// ARCHIVO: Promotions.jsx
//
// DESCRIPCIÓN:
// Sección encargada de presentar las promociones vigentes de la óptica.
// ============================================================================

import "./Promotions.css";
import { FaCalendarCheck, FaGlasses, FaTags } from "react-icons/fa";

const promotions = [
    {
        id: 1,
        icon: <FaGlasses />,
        label: "Oferta destacada",
        title: "Segundo par con 50% de descuento",
        description:
            "Renueva tu estilo y lleva un segundo par de lentes seleccionados a mitad de precio.",
        detail: "Aplican términos y condiciones.",
        featured: true
    },
    {
        id: 2,
        icon: <FaCalendarCheck />,
        label: "Por tiempo limitado",
        title: "Examen visual sin costo",
        description:
            "Recibe una valoración visual profesional al comprar tus lentes formulados con nosotros.",
        detail: "Sujeto a disponibilidad de agenda.",
        featured: false
    }
];

function Promotions() {
    return (
        <section className="promotions" id="promociones">
            <div className="promotions-heading">
                <span className="promotions-eyebrow">
                    <FaTags aria-hidden="true" /> Promociones especiales
                </span>

                <h2>Cuida tu visión y ahorra</h2>

                <p>
                    Aprovecha nuestros beneficios y encuentra la solución visual
                    ideal para ti y tu familia.
                </p>
            </div>

            <div className="promotions-container">
                {promotions.map((promotion) => (
                    <article
                        className={`promotion-card${promotion.featured ? " promotion-card--featured" : ""}`}
                        key={promotion.id}
                    >
                        <div className="promotion-icon" aria-hidden="true">
                            {promotion.icon}
                        </div>

                        <div className="promotion-content">
                            <span className="promotion-label">{promotion.label}</span>
                            <h3>{promotion.title}</h3>
                            <p>{promotion.description}</p>
                            <small>{promotion.detail}</small>
                        </div>

                        <a className="promotion-button" href="#servicios">
                            Conocer más
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Promotions;
