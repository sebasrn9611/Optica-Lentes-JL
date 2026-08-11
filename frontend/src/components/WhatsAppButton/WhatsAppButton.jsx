import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

function WhatsAppButton() {
    return (
        <a
            className="whatsapp-floating-button"
            href="https://wa.me/573103048082"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp al 310 304 8082"
            title="Escríbenos por WhatsApp"
        >
            <FaWhatsapp aria-hidden="true" />
        </a>
    );
}

export default WhatsAppButton;
