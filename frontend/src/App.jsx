// ============================================================================
// ARCHIVO: App.jsx
//
// DESCRIPCIÓN:
// Componente principal encargado de organizar todas las rutas
// y secciones de la aplicación Óptica Lentes J.L.
// ============================================================================


// ============================================================================
// IMPORTACIONES DE LA PÁGINA PÚBLICA
// ============================================================================

// Barra de navegación principal.
import Navbar from "./components/Navbar/Navbar";

// Sección principal.
import Hero from "./components/Hero/Hero";

// Servicios de la óptica.
import Services from "./components/Services/Services";

// Productos destacados.
import Products from "./components/Products/products";

// Razones para elegir la óptica.
import Features from "./components/Features/Features";

// Promociones.
import Promotions from "./components/Promotions/Promotions";

// Testimonios.
import Testimonials from "./components/Testimonials/Testimonials";

// Guías desplegables para los clientes.
import HelpGuide from "./components/HelpGuide/HelpGuide";

// Pie de página.
import Footer from "./components/Footer/Footer";

// Botón flotante de contacto por WhatsApp.
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";


// ============================================================================
// REACT ROUTER
// ============================================================================

// Route permite definir cada ruta.
// Routes contiene todas las rutas de la aplicación.
import {
    Route,
    Routes
} from "react-router-dom";


// ============================================================================
// PÁGINAS
// ============================================================================

// Página de inicio de sesión.
import Login from "./pages/Login/Login";

// Página principal del panel administrativo.
import Admin from "./pages/Admin/Admin";

// Página para administrar productos.
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import AdminAppointments from "./pages/Admin/Appointments/AdminAppointments";


// ============================================================================
// LAYOUTS
// ============================================================================

// Layout que mantiene visible el menú administrativo.
import AdminLayout from "./layouts/AdminLayout";


// ============================================================================
// PROTECCIÓN DE RUTAS
// ============================================================================

// Componente que impide entrar al panel sin iniciar sesión.
import ProtectedRoute from "./routes/ProtectedRoute";


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

function App() {

    return (

        // Todas las rutas deben estar dentro de Routes.
        <Routes>


            {/* ================================================================
                PÁGINA PRINCIPAL PÚBLICA
               ================================================================ */}

            <Route
                path="/"
                element={
                    <>
                        {/* Barra de navegación */}
                        <Navbar />

                        {/* Sección principal */}
                        <Hero />

                        {/* Servicios */}
                        <Services />

                        {/* Productos destacados */}
                        <Products />

                        {/* Razones para confiar en la óptica */}
                        <Features />

                        {/* Promociones */}
                        <Promotions />

                        {/* Testimonios */}
                        <Testimonials />

                        {/* Preguntas y guías para clientes */}
                        <HelpGuide />

                        {/* Pie de página */}
                        <Footer />

                        {/* Contacto directo por WhatsApp */}
                        <WhatsAppButton />
                    </>
                }
            />


            {/* ================================================================
                LOGIN
               ================================================================ */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* ================================================================
                RUTAS ADMINISTRATIVAS PROTEGIDAS
               ================================================================ */}

            {/* 
                ProtectedRoute verifica que exista una sesión administrativa
                antes de permitir entrar a las rutas que están dentro.
            */}
            <Route element={<ProtectedRoute />}>


                {/* ============================================================
                    LAYOUT ADMINISTRATIVO
                   ============================================================ */}

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    {/* --------------------------------------------------------
                        RESUMEN GENERAL

                        Ruta:
                        /admin
                       -------------------------------------------------------- */}

                    <Route
                        index
                        element={<Admin />}
                    />


                    {/* --------------------------------------------------------
                        ADMINISTRACIÓN DE PRODUCTOS

                        Ruta:
                        /admin/products
                       -------------------------------------------------------- */}

                    <Route
                        path="products"
                        element={<AdminProducts />}
                    />

                    <Route
                        path="citas"
                        element={<AdminAppointments />}
                    />


                </Route>

            </Route>


        </Routes>
    );
}


// Exportamos App para utilizarlo desde main.jsx.
export default App;
