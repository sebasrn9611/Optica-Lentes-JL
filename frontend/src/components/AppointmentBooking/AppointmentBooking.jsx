import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { createAppointment, getAvailability } from "../../services/appointmentService";
import "./AppointmentBooking.css";

const today = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const initialForm = {
    firstName: "",
    lastName: "",
    documentNumber: "",
    phone: "",
    email: "",
    appointmentDate: today(),
    appointmentTime: ""
};

const errorMessage = (error) =>
    error.response?.data?.message || "No pudimos guardar la cita. Intenta nuevamente.";

function AppointmentBooking({ open, onClose }) {
    const [form, setForm] = useState(initialForm);
    const [times, setTimes] = useState([]);
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!open) return undefined;
        const handleKey = (event) => event.key === "Escape" && onClose();
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open || !form.appointmentDate) return;
        let active = true;
        setLoadingTimes(true);
        setMessage("");
        getAvailability(form.appointmentDate)
            .then((data) => active && setTimes(data.availableTimes))
            .catch((error) => active && setMessage(errorMessage(error)))
            .finally(() => active && setLoadingTimes(false));
        return () => { active = false; };
    }, [open, form.appointmentDate]);

    if (!open) return null;

    const update = ({ target }) => {
        setForm((current) => ({
            ...current,
            [target.name]: target.value,
            ...(target.name === "appointmentDate" ? { appointmentTime: "" } : {})
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage("");
        try {
            const appointment = await createAppointment(form);
            setSuccess(appointment);
            setForm({ ...initialForm, appointmentDate: today() });
            setTimes([]);
        } catch (error) {
            setMessage(errorMessage(error));
            if (error.response?.status === 409) {
                const availability = await getAvailability(form.appointmentDate).catch(() => null);
                if (availability) setTimes(availability.availableTimes);
                setForm((current) => ({ ...current, appointmentTime: "" }));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const close = () => {
        setMessage("");
        setSuccess(null);
        onClose();
    };

    return (
        <div className="appointment-overlay" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
            <section className="appointment-modal" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
                <button className="appointment-close" type="button" onClick={close} aria-label="Cerrar formulario">
                    <FaTimes />
                </button>

                {success ? (
                    <div className="appointment-success">
                        <FaCheckCircle />
                        <h2 id="appointment-title">¡Tu cita quedó agendada!</h2>
                        <p>Te esperamos el <strong>{success.appointmentDate}</strong> a las <strong>{success.appointmentTime}</strong>.</p>
                        <p>Usaremos <strong>{success.email}</strong> para contactarte si hay alguna novedad.</p>
                        <button type="button" onClick={close}>Entendido</button>
                    </div>
                ) : (
                    <>
                        <header className="appointment-heading">
                            <span><FaCalendarAlt /> Agenda tu valoración</span>
                            <h2 id="appointment-title">Elige el mejor momento para cuidar tu visión</h2>
                            <p>Completa tus datos y selecciona uno de los horarios disponibles.</p>
                        </header>

                        <form onSubmit={submit} className="appointment-form">
                            <div className="appointment-fields">
                                <label>Nombre<input name="firstName" value={form.firstName} onChange={update} autoComplete="given-name" maxLength="80" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü .'-]+" required /></label>
                                <label>Apellido<input name="lastName" value={form.lastName} onChange={update} autoComplete="family-name" maxLength="80" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü .'-]+" required /></label>
                                <label>Número de cédula<input name="documentNumber" value={form.documentNumber} onChange={update} inputMode="numeric" pattern="[0-9]{6,10}" title="Entre 6 y 10 dígitos" required /></label>
                                <label>Celular<input name="phone" value={form.phone} onChange={update} autoComplete="tel" inputMode="tel" pattern="[0-9]{10}" title="10 dígitos" required /></label>
                                <label className="appointment-wide">Correo electrónico<input type="email" name="email" value={form.email} onChange={update} autoComplete="email" maxLength="160" required /></label>
                                <label className="appointment-wide">Fecha<input type="date" name="appointmentDate" value={form.appointmentDate} min={today()} onChange={update} required /></label>
                            </div>

                            <fieldset className="appointment-times">
                                <legend>Horarios disponibles</legend>
                                {loadingTimes ? <p>Cargando disponibilidad…</p> : times.length ? (
                                    <div className="appointment-time-grid">
                                        {times.map((time) => (
                                            <label key={time} className={form.appointmentTime === time ? "selected" : ""}>
                                                <input type="radio" name="appointmentTime" value={time} checked={form.appointmentTime === time} onChange={update} required />
                                                {time}
                                            </label>
                                        ))}
                                    </div>
                                ) : <p>No hay horarios disponibles para esta fecha. Prueba con otro día.</p>}
                            </fieldset>

                            {message && <p className="appointment-message" role="alert">{message}</p>}
                            <p className="appointment-privacy">Tus datos se usarán únicamente para gestionar esta cita.</p>
                            <button className="appointment-submit" type="submit" disabled={submitting || !form.appointmentTime}>
                                {submitting ? "Guardando cita…" : "Confirmar cita"}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
}

export default AppointmentBooking;
