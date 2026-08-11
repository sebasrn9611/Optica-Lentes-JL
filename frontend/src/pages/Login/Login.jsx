// ============================================================================
// ARCHIVO: Login.jsx
//
// DESCRIPCIÓN:
// Página de inicio de sesión con validación local en React.
// ============================================================================

// useState permite guardar y actualizar los datos del formulario.
import { useState } from "react";

// Link permite navegar entre páginas sin recargar completamente el sitio.
import { Link, useNavigate } from "react-router-dom";

// Iconos utilizados en los campos y controles de la página.
import { FaArrowLeft, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

// Logo oficial de la óptica y estilos exclusivos de esta página.
import logoOptica from "../../assets/logo/logo-optica-transparente.png";

import "./Login.css";

// Instancia de Axios configurada para comunicarse con Spring Boot.
import api from "../../api/api";

// Valores iniciales del formulario.
// Se declaran fuera del componente para mantener la configuración organizada.
const initialForm = {
    email: "",
    password: "",
    remember: false
};

function Login() {
    // Permite enviar al usuario al panel después de validar el formulario.
    const navigate = useNavigate();

    // Guarda el correo, la contraseña y el estado de la opción "Recordarme".
    const [form, setForm] = useState(initialForm);

    // Guarda los mensajes de error correspondientes a cada campo.
    const [errors, setErrors] = useState({});

    // Controla si la contraseña se muestra como texto o permanece oculta.
    const [showPassword, setShowPassword] = useState(false);

    // Muestra mensajes informativos después de validar o recuperar la contraseña.
    const [message, setMessage] = useState("");

    // Indica si estamos esperando la respuesta de Spring Boot.
    const [loading, setLoading] = useState(false);

    // Actualiza cualquier campo del formulario mediante su atributo "name".
    const handleChange = (event) => {
        // checked se usa para el checkbox; value se usa para los campos de texto.
        const { name, value, checked, type } = event.target;

        // Conservamos los valores anteriores y modificamos únicamente el campo actual.
        setForm((currentForm) => ({
            ...currentForm,
            [name]: type === "checkbox" ? checked : value
        }));

        // Eliminamos el error del campo mientras el usuario intenta corregirlo.
        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: ""
        }));
        // Limpiamos mensajes anteriores cuando se modifica el formulario.
        setMessage("");
    };

    // Revisa que el correo y la contraseña cumplan las reglas definidas.
    const validateForm = () => {
        // Este objeto acumulará solamente los errores encontrados.
        const newErrors = {};

        // Expresión regular sencilla para comprobar la estructura de un correo.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validación del correo: obligatorio y con formato válido.
        if (!form.email.trim()) {
            newErrors.email = "Ingresa tu correo electrónico.";
        } else if (!emailPattern.test(form.email)) {
            newErrors.email = "Ingresa un correo electrónico válido.";
        }

        // Validación de la contraseña: obligatoria y mínimo seis caracteres.
        if (!form.password) {
            newErrors.password = "Ingresa tu contraseña.";
        } else if (form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        // Si no se encontraron errores, el objeto regresará vacío.
        return newErrors;
    };

    // ============================================================================
// INICIAR SESIÓN
// ============================================================================

const handleSubmit = async (event) => {

    // Evita que el navegador recargue la página.
    event.preventDefault();

    // Validamos primero los campos en React.
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {

        setErrors(validationErrors);

        setMessage("");

        return;
    }

    // Limpiamos errores anteriores.
    setErrors({});

    setMessage("");

    // Indicamos que estamos consultando el servidor.
    setLoading(true);

    try {

        /*
         * Enviamos las credenciales al backend.
         *
         * Como api.js ya contiene la dirección:
         * http://localhost:8080/api
         *
         * la petición final será:
         *
         * POST http://localhost:8080/api/auth/login
         */
        const response = await api.post(
            "/auth/login",
            {
                email: form.email,
                password: form.password
            }
        );


        // ================================================================
        // LOGIN CORRECTO
        // ================================================================

        if (response.data.success) {

            /*
             * Guardamos temporalmente información básica
             * del administrador.
             *
             * NO guardamos la contraseña.
             */
            sessionStorage.setItem(
                "adminUser",
                JSON.stringify({
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role
                })
            );

            // Guardamos el JWT recibido desde Spring Boot.
            sessionStorage.setItem(
             "authToken",
            response.data.token
            );


            // Después entramos al panel.
            navigate("/admin");

        }

    } catch (error) {

        console.error(
            "Error iniciando sesión:",
            error
        );


        // ================================================================
        // CREDENCIALES INCORRECTAS
        // ================================================================

        if (error.response?.status === 401) {

            setMessage(
                error.response.data?.message ||
                "Correo o contraseña incorrectos."
            );

        } else {

            // ============================================================
            // ERROR DE CONEXIÓN
            // ============================================================

            setMessage(
                "No fue posible conectar con el servidor. Verifica que Spring Boot esté ejecutándose."
            );
        }

    } finally {

        // La petición terminó, haya funcionado o no.
        setLoading(false);

    }
};

    // Simula la solicitud de recuperación de contraseña.
    const handleRecovery = () => {
        // El correo es necesario para saber a qué cuenta enviar la recuperación.
        if (!form.email.trim()) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                email: "Escribe tu correo para recuperar la contraseña."
            }));
            setMessage("");
            return;
        }

        // Mensaje temporal mientras no exista conexión con el backend.
        setMessage("La recuperación de contraseña estará disponible al conectar el servidor.");
    };

    return (
        // Contenedor principal dividido entre bienvenida y formulario.
        <main className="login-page">
            {/* Panel visual de bienvenida mostrado a la izquierda en escritorio. */}
            <section className="login-welcome" aria-label="Bienvenida">
                <div className="login-welcome-content">
                    <span className="login-welcome-label">Óptica Lentes J.L</span>
                    <h1>Tu visión, siempre en buenas manos</h1>
                    <p>
                        Ingresa para administrar tus datos y acceder próximamente
                        a tus citas, fórmulas y compras.
                    </p>
                </div>
            </section>

            {/* Panel que contiene la tarjeta y el formulario de acceso. */}
            <section className="login-panel">
                <div className="login-card">
                    {/* Permite volver a la página principal mediante React Router. */}
                    <Link className="login-back" to="/">
                        <FaArrowLeft aria-hidden="true" /> Regresar al inicio
                    </Link>

                    {/* Identidad visual de la óptica. */}
                    <img className="login-logo" src={logoOptica} alt="Óptica Lentes J.L" />

                    <div className="login-heading">
                        <h2>Iniciar sesión</h2>
                        <p>Bienvenido, ingresa tus datos para continuar.</p>
                    </div>

                    {/* noValidate desactiva los avisos nativos para usar mensajes de React. */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Campo de correo electrónico. */}
                        <div className="login-field">
                            <label htmlFor="email">Correo electrónico</label>
                            <div className={`login-input${errors.email ? " login-input--error" : ""}`}>
                                <FaEnvelope aria-hidden="true" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="nombre@correo.com"
                                    autoComplete="email"
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                            </div>
                            {/* El error solo se renderiza cuando existe. */}
                            {errors.email && <small id="email-error">{errors.email}</small>}
                        </div>

                        {/* Campo de contraseña con control de visibilidad. */}
                        <div className="login-field">
                            <label htmlFor="password">Contraseña</label>
                            <div className={`login-input${errors.password ? " login-input--error" : ""}`}>
                                <FaLock aria-hidden="true" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Mínimo 6 caracteres"
                                    autoComplete="current-password"
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                />
                                {/* Este botón cambia el tipo del campo entre password y text. */}
                                <button
                                    className="password-toggle"
                                    type="button"
                                    onClick={() => setShowPassword((isVisible) => !isVisible)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <small id="password-error">{errors.password}</small>}
                        </div>

                        {/* Opciones adicionales del formulario. */}
                        <div className="login-options">
                            {/* Checkbox controlado por el estado form.remember. */}
                            <label className="remember-option">
                                <input
                                    name="remember"
                                    type="checkbox"
                                    checked={form.remember}
                                    onChange={handleChange}
                                />
                                <span>Recordar mi sesión</span>
                            </label>

                            {/* type="button" evita que este control envíe el formulario. */}
                            <button className="recovery-button" type="button" onClick={handleRecovery}>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {/* role="status" permite que lectores de pantalla anuncien el mensaje. */}
                        {message && <p className="login-message" role="status">{message}</p>}

                        <button
                            className="login-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Verificando..."
                                : "Ingresar"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

// Exportamos el componente para utilizarlo en la ruta /login.
export default Login;
