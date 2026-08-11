import { FaGlasses } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <Link to="/admin/products" className="admin-menu-link">
            <FaGlasses />
            <span>Productos</span>
        </Link>
    );
}

export default AdminDashboard;
