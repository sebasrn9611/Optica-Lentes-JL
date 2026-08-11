import { FaCalendarCheck, FaChevronDown, FaGlasses, FaShoppingBag } from "react-icons/fa";
import buyingImage from "../../assets/guides/como-comprar.png";
import appointmentImage from "../../assets/guides/como-pedir-cita.png";
import prescriptionImage from "../../assets/guides/como-leer-formula.png";
import "./HelpGuide.css";

const guides = [
    {
        title: "¿Cómo comprar?",
        icon: FaShoppingBag,
        image: buyingImage,
        imageAlt: "Cliente eligiendo monturas con asesoría profesional en la óptica",
        content: (
            <>
                <p>Comprar tus lentes es muy sencillo:</p>
                <ol>
                    <li>Explora nuestros productos y elige la montura que más te guste.</li>
                    <li>Visítanos o escríbenos por WhatsApp para confirmar disponibilidad.</li>
                    <li>Presenta tu fórmula vigente o agenda un examen visual.</li>
                    <li>Te asesoramos con los lentes, medidas y método de pago.</li>
                </ol>
                <a className="guide-action" href="#productos">Ver productos</a>
            </>
        ),
    },
    {
        title: "¿Cómo pedir citas?",
        icon: FaCalendarCheck,
        image: appointmentImage,
        imageAlt: "Persona solicitando una cita desde su teléfono celular",
        content: (
            <>
                <p>Agenda tu valoración visual directamente por WhatsApp:</p>
                <ol>
                    <li>Presiona el botón “Pedir cita por WhatsApp”.</li>
                    <li>Indícanos tu nombre y los días u horarios que prefieres.</li>
                    <li>Espera nuestra confirmación con la fecha y hora disponibles.</li>
                </ol>
                <a
                    className="guide-action"
                    href="https://wa.me/573103048082?text=Hola%2C%20quiero%20agendar%20una%20cita%20de%20valoraci%C3%B3n%20visual."
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Pedir cita por WhatsApp
                </a>
            </>
        ),
    },
    {
        title: "¿Cómo leer tu fórmula?",
        icon: FaGlasses,
        image: prescriptionImage,
        imageAlt: "Profesional explicando los campos de una fórmula para lentes",
        content: (
            <>
                <p>Estos son los campos más comunes de una fórmula óptica:</p>
                <ul>
                    <li><strong>OD y OI:</strong> ojo derecho y ojo izquierdo.</li>
                    <li><strong>Esfera (ESF/SPH):</strong> corrige miopía (−) o hipermetropía (+).</li>
                    <li><strong>Cilindro (CIL/CYL):</strong> indica la corrección del astigmatismo.</li>
                    <li><strong>Eje (AXIS):</strong> orientación del astigmatismo, entre 0° y 180°.</li>
                    <li><strong>Adición (ADD):</strong> aumento adicional para visión cercana.</li>
                    <li><strong>DP/DIP:</strong> distancia entre las pupilas.</li>
                </ul>
                <p className="guide-note">
                    La fórmula debe ser interpretada y validada por un profesional de la salud visual.
                </p>
            </>
        ),
    },
];

function HelpGuide() {
    return (
        <section className="help-guide" id="guia">
            <div className="help-guide__heading">
                <span>Guía para nuestros clientes</span>
                <h2>¿Cómo podemos ayudarte?</h2>
                <p>Selecciona una pregunta para consultar la información.</p>
            </div>

            <div className="help-guide__list">
                {guides.map(({ title, icon: Icon, image, imageAlt, content }) => (
                    <details className="guide-item" key={title}>
                        <summary>
                            <span className="guide-item__question">
                                <Icon aria-hidden="true" />
                                {title}
                            </span>
                            <FaChevronDown className="guide-item__chevron" aria-hidden="true" />
                        </summary>

                        <div className="guide-item__answer">
                            <img src={image} alt={imageAlt} loading="lazy" />
                            <div className="guide-item__content">{content}</div>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}

export default HelpGuide;
