// ============================================================================
// ARCHIVO: Testimonials.jsx
//
// DESCRIPCIÓN:
// Sección que presenta las opiniones de los clientes de la óptica.
// ============================================================================

import "./Testimonials.css";
import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const defaultTestimonials = [
    {
        id: 1,
        name: "María González",
        initials: "MG",
        comment:
            "La atención fue excelente. Me ayudaron a encontrar unas monturas cómodas y perfectas para mi estilo.",
        rating: 5
    },
    {
        id: 2,
        name: "Carlos Ramírez",
        initials: "CR",
        comment:
            "El examen visual fue muy completo y recibí mis lentes en el tiempo acordado. Totalmente recomendados.",
        rating: 5
    },
    {
        id: 3,
        name: "Laura Martínez",
        initials: "LM",
        comment:
            "Encontré gran variedad de diseños y una asesoría muy profesional. Estoy feliz con mis nuevos lentes.",
        rating: 5
    }
];

const STORAGE_KEY = "optica-testimonials";

function getSavedTestimonials() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
}

function Testimonials() {
    const [savedTestimonials, setSavedTestimonials] = useState(getSavedTestimonials);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [status, setStatus] = useState("");

    const testimonials = [...savedTestimonials, ...defaultTestimonials];

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim() || !comment.trim() || rating === 0) {
            setStatus("Completa tu nombre, comentario y puntuación.");
            return;
        }

        const newTestimonial = {
            id: `patient-${Date.now()}`,
            name: name.trim(),
            initials: getInitials(name),
            comment: comment.trim(),
            rating,
        };

        const updatedTestimonials = [newTestimonial, ...savedTestimonials];

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTestimonials));
            setSavedTestimonials(updatedTestimonials);
            setName("");
            setComment("");
            setRating(0);
            setStatus("¡Gracias! Tu testimonio quedó guardado.");
        } catch {
            setStatus("No fue posible guardar el testimonio. Inténtalo nuevamente.");
        }
    };

    return (
        <section className="testimonials" id="testimonios">
            <div className="testimonials-heading">
                <span>Experiencias que nos inspiran</span>
                <h2>Lo que dicen nuestros clientes</h2>
                <p>
                    Su confianza es nuestra mejor recomendación y nos motiva a
                    cuidar cada detalle de su experiencia.
                </p>
            </div>

            <form className="testimonial-form" onSubmit={handleSubmit}>
                <div className="testimonial-form__intro">
                    <span>Tu opinión es importante</span>
                    <h3>Comparte tu experiencia</h3>
                    <p>Cuéntanos cómo fue tu atención en Óptica Lentes J.L.</p>
                </div>

                <div className="testimonial-form__fields">
                    <label htmlFor="testimonial-name">Nombre</label>
                    <input
                        id="testimonial-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        maxLength={60}
                        placeholder="Escribe tu nombre"
                        required
                    />

                    <fieldset className="rating-fieldset">
                        <legend>Puntuación</legend>
                        <div
                            className="star-selector"
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    className={star <= (hoveredRating || rating) ? "star-button star-button--active" : "star-button"}
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
                                    aria-pressed={rating === star}
                                >
                                    <FaStar aria-hidden="true" />
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <label htmlFor="testimonial-comment">Comentario o testimonio</label>
                    <textarea
                        id="testimonial-comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        maxLength={500}
                        rows={5}
                        placeholder="Escribe aquí tu experiencia..."
                        required
                    />
                    <span className="testimonial-character-count">{comment.length}/500</span>

                    <button className="testimonial-submit" type="submit">
                        Publicar testimonio
                    </button>

                    {status && (
                        <p className="testimonial-form__status" role="status">{status}</p>
                    )}
                </div>
            </form>

            <div className="testimonials-container">
                {testimonials.map((testimonial) => (
                    <article className="testimonial-card" key={testimonial.id}>
                        <FaQuoteLeft className="testimonial-quote" aria-hidden="true" />

                        <div
                            className="testimonial-rating"
                            aria-label={`${testimonial.rating} de 5 estrellas`}
                        >
                            {Array.from({ length: testimonial.rating }, (_, index) => (
                                <FaStar key={index} aria-hidden="true" />
                            ))}
                        </div>

                        <blockquote>“{testimonial.comment}”</blockquote>

                        <div className="testimonial-customer">
                            <div className="testimonial-avatar" aria-hidden="true">
                                {testimonial.initials}
                            </div>

                            <div>
                                <h3>{testimonial.name}</h3>
                                <p>Cliente de Óptica Lentes J.L</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
