import { useCallback, useEffect, useState } from "react";
import { FaCalendarAlt, FaCalendarCheck, FaClock, FaTimesCircle } from "react-icons/fa";
import {
    cancelAppointment,
    getAppointments,
    getAppointmentStats,
    getAvailability,
    rescheduleAppointment
} from "../../../services/appointmentService";
import "./AdminAppointments.css";

const today = () => {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const messageFrom = (error) => error.response?.data?.message || "No fue posible completar la operación.";
const dateLabel = (value) => new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00`));

function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({ pending: 0, today: 0, upcoming: 0, cancelled: 0 });
    const [filter, setFilter] = useState("PENDING");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(null);
    const [schedule, setSchedule] = useState({ appointmentDate: today(), appointmentTime: "" });
    const [times, setTimes] = useState([]);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [items, summary] = await Promise.all([
                getAppointments(filter || undefined),
                getAppointmentStats()
            ]);
            setAppointments(items);
            setStats(summary);
        } catch (error) {
            setMessage(messageFrom(error));
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => { load(); }, [load]);

    const openReschedule = async (appointment) => {
        setEditing(appointment);
        setMessage("");
        setSchedule({ appointmentDate: appointment.appointmentDate, appointmentTime: appointment.appointmentTime });
        try {
            const data = await getAvailability(appointment.appointmentDate);
            setTimes([...new Set([...data.availableTimes, appointment.appointmentTime])].sort());
        } catch (error) {
            setMessage(messageFrom(error));
        }
    };

    const changeDate = async (date) => {
        setSchedule({ appointmentDate: date, appointmentTime: "" });
        setTimes([]);
        try {
            const data = await getAvailability(date);
            setTimes(data.availableTimes);
        } catch (error) {
            setMessage(messageFrom(error));
        }
    };

    const saveSchedule = async (event) => {
        event.preventDefault();
        try {
            await rescheduleAppointment(editing.id, schedule);
            setEditing(null);
            setMessage("La cita fue reagendada correctamente.");
            await load();
        } catch (error) {
            setMessage(messageFrom(error));
        }
    };

    const cancel = async (appointment) => {
        if (!window.confirm(`¿Cancelar la cita de ${appointment.firstName} ${appointment.lastName}?`)) return;
        const reason = window.prompt("Motivo de cancelación (opcional):", "") ?? null;
        if (reason === null) return;
        try {
            await cancelAppointment(appointment.id, reason);
            setMessage("La cita fue cancelada y el horario quedó disponible.");
            await load();
        } catch (error) {
            setMessage(messageFrom(error));
        }
    };

    return (
        <section className="appointments-admin">
            <div className="appointments-title">
                <div><span>Agenda conectada</span><h2>Gestión de citas</h2><p>Consulta, reagenda o cancela las solicitudes de tus pacientes.</p></div>
                <label>Mostrar<select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="PENDING">Pendientes</option><option value="CANCELLED">Canceladas</option><option value="">Todas</option></select></label>
            </div>

            <div className="appointment-stat-grid">
                <article><FaClock /><div><strong>{stats.pending}</strong><span>Pendientes</span></div></article>
                <article><FaCalendarAlt /><div><strong>{stats.today}</strong><span>Para hoy</span></div></article>
                <article><FaCalendarCheck /><div><strong>{stats.upcoming}</strong><span>Próximas</span></div></article>
                <article><FaTimesCircle /><div><strong>{stats.cancelled}</strong><span>Canceladas</span></div></article>
            </div>

            {message && <p className="appointments-alert" role="status">{message}</p>}

            <div className="appointments-table-wrap">
                <table className="appointments-table">
                    <thead><tr><th>Fecha y hora</th><th>Paciente</th><th>Contacto</th><th>Cédula</th><th>Estado</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {!loading && appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td><strong>{dateLabel(appointment.appointmentDate)}</strong><small>{appointment.appointmentTime}</small></td>
                                <td>{appointment.firstName} {appointment.lastName}</td>
                                <td><a href={`tel:${appointment.phone}`}>{appointment.phone}</a><small>{appointment.email}</small></td>
                                <td>{appointment.documentNumber}</td>
                                <td><span className={`appointment-state appointment-state--${appointment.status.toLowerCase()}`}>{appointment.status === "PENDING" ? "Pendiente" : "Cancelada"}</span></td>
                                <td>{appointment.status === "PENDING" && <div className="appointment-actions"><button type="button" onClick={() => openReschedule(appointment)}>Reagendar</button><button className="danger" type="button" onClick={() => cancel(appointment)}>Cancelar</button></div>}</td>
                            </tr>
                        ))}
                        {!loading && !appointments.length && <tr><td colSpan="6" className="appointments-empty">No hay citas en este estado.</td></tr>}
                        {loading && <tr><td colSpan="6" className="appointments-empty">Cargando agenda…</td></tr>}
                    </tbody>
                </table>
            </div>

            {editing && (
                <div className="reschedule-overlay" role="presentation">
                    <form className="reschedule-modal" onSubmit={saveSchedule}>
                        <h3>Reagendar cita</h3>
                        <p>{editing.firstName} {editing.lastName}</p>
                        <label>Nueva fecha<input type="date" min={today()} value={schedule.appointmentDate} onChange={(e) => changeDate(e.target.value)} required /></label>
                        <label>Nuevo horario<select value={schedule.appointmentTime} onChange={(e) => setSchedule((value) => ({ ...value, appointmentTime: e.target.value }))} required><option value="">Selecciona una hora</option>{times.map((time) => <option key={time} value={time}>{time}</option>)}</select></label>
                        {!times.length && <small>No hay cupos disponibles para esta fecha.</small>}
                        <div><button type="button" onClick={() => setEditing(null)}>Cerrar</button><button type="submit" disabled={!schedule.appointmentTime}>Guardar cambio</button></div>
                    </form>
                </div>
            )}
        </section>
    );
}

export default AdminAppointments;
