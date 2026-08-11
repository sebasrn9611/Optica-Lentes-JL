import {
    FaCalendarAlt,
    FaClipboardList,
    FaDollarSign,
    FaGlasses,
    FaUsers
} from "react-icons/fa";

import "./Admin.css";

const statistics = [
    { id: 1, title: "Productos", value: "128", detail: "12 categorías", icon: <FaGlasses />, color: "blue" },
    { id: 2, title: "Citas de hoy", value: "8", detail: "3 pendientes", icon: <FaCalendarAlt />, color: "green" },
    { id: 3, title: "Clientes", value: "346", detail: "+18 este mes", icon: <FaUsers />, color: "purple" },
    { id: 4, title: "Ventas del mes", value: "$8.450.000", detail: "+12% frente al mes anterior", icon: <FaDollarSign />, color: "orange" }
];

const appointments = [
    { id: 1, time: "09:00 a. m.", client: "María González", service: "Examen visual", status: "Confirmada" },
    { id: 2, time: "10:30 a. m.", client: "Carlos Ramírez", service: "Control de lentes", status: "Pendiente" },
    { id: 3, time: "02:00 p. m.", client: "Laura Martínez", service: "Asesoría de monturas", status: "Confirmada" }
];

const lowStockProducts = [
    { id: 1, name: "Montura Clásica Negra", category: "Monturas", stock: 3 },
    { id: 2, name: "Lentes de contacto mensual", category: "Lentes de contacto", stock: 5 },
    { id: 3, name: "Estuche rígido azul", category: "Accesorios", stock: 4 }
];

function Admin() {
    return (
        <>
            <section className="admin-stats" aria-label="Indicadores principales">
                {statistics.map((statistic) => (
                    <article className="admin-stat-card" key={statistic.id}>
                        <div className={`admin-stat-icon admin-stat-icon--${statistic.color}`} aria-hidden="true">
                            {statistic.icon}
                        </div>
                        <div>
                            <p>{statistic.title}</p>
                            <strong>{statistic.value}</strong>
                            <small>{statistic.detail}</small>
                        </div>
                    </article>
                ))}
            </section>

            <section className="admin-grid">
                <article className="admin-panel-card">
                    <div className="admin-card-heading">
                        <div>
                            <h2>Próximas citas</h2>
                            <p>Agenda para hoy</p>
                        </div>
                        <FaCalendarAlt aria-hidden="true" />
                    </div>

                    <div className="admin-table-wrapper">
                        <table>
                            <thead>
                                <tr><th>Hora</th><th>Cliente</th><th>Servicio</th><th>Estado</th></tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.client}</td>
                                        <td>{appointment.service}</td>
                                        <td>
                                            <span className={`admin-status admin-status--${appointment.status.toLowerCase()}`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>

                <article className="admin-panel-card">
                    <div className="admin-card-heading">
                        <div>
                            <h2>Inventario bajo</h2>
                            <p>Productos que requieren atención</p>
                        </div>
                        <FaClipboardList aria-hidden="true" />
                    </div>

                    <div className="stock-list">
                        {lowStockProducts.map((product) => (
                            <div className="stock-item" key={product.id}>
                                <div>
                                    <strong>{product.name}</strong>
                                    <span>{product.category}</span>
                                </div>
                                <span className="stock-amount">{product.stock} unidades</span>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </>
    );
}

export default Admin;
