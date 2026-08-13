import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaDollarSign, FaGlasses, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAppointments, getAppointmentStats } from "../../services/appointmentService";
import { getProducts } from "../../services/productService";
import "./Admin.css";

const dateLabel = (value) => new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00`));

function Admin() {
    const [products, setProducts] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({ pending: 0, today: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([getProducts(), getAppointments("PENDING"), getAppointmentStats()])
            .then(([productData, appointmentData, appointmentStats]) => {
                setProducts(productData);
                setAppointments(appointmentData.slice(0, 5));
                setStats(appointmentStats);
            })
            .catch(() => setError("No fue posible actualizar el resumen del panel."));
    }, []);

    const lowStock = products.filter((product) => product.stock <= 5).slice(0, 4);
    const statistics = [
        { title: "Productos", value: products.length, detail: "Registrados", icon: <FaGlasses />, color: "blue" },
        { title: "Citas de hoy", value: stats.today, detail: `${stats.pending} pendientes`, icon: <FaCalendarAlt />, color: "green" },
        { title: "Clientes", value: "—", detail: "Módulo próximo", icon: <FaUsers />, color: "purple" },
        { title: "Ventas del mes", value: "—", detail: "Módulo próximo", icon: <FaDollarSign />, color: "orange" }
    ];

    return (
        <>
            {error && <p className="appointments-alert">{error}</p>}
            <section className="admin-stats" aria-label="Indicadores principales">
                {statistics.map((item) => <article className="admin-stat-card" key={item.title}><div className={`admin-stat-icon admin-stat-icon--${item.color}`}>{item.icon}</div><div><p>{item.title}</p><strong>{item.value}</strong><small>{item.detail}</small></div></article>)}
            </section>
            <section className="admin-grid">
                <article className="admin-panel-card">
                    <div className="admin-card-heading"><div><h2>Próximas citas</h2><p>Agenda pendiente</p></div><Link to="/admin/citas">Ver agenda</Link></div>
                    <div className="admin-table-wrapper"><table><thead><tr><th>Fecha</th><th>Hora</th><th>Paciente</th><th>Estado</th></tr></thead><tbody>
                        {appointments.map((item) => <tr key={item.id}><td>{dateLabel(item.appointmentDate)}</td><td>{item.appointmentTime}</td><td>{item.firstName} {item.lastName}</td><td><span className="admin-status admin-status--pendiente">Pendiente</span></td></tr>)}
                        {!appointments.length && <tr><td colSpan="4">No hay citas pendientes.</td></tr>}
                    </tbody></table></div>
                </article>
                <article className="admin-panel-card">
                    <div className="admin-card-heading"><div><h2>Inventario bajo</h2><p>Productos que requieren atención</p></div><FaClipboardList /></div>
                    <div className="stock-list">{lowStock.map((product) => <div className="stock-item" key={product.id}><div><strong>{product.name}</strong><span>{product.category}</span></div><span className="stock-amount">{product.stock} unidades</span></div>)}{!lowStock.length && <p>No hay alertas de inventario.</p>}</div>
                </article>
            </section>
        </>
    );
}

export default Admin;
