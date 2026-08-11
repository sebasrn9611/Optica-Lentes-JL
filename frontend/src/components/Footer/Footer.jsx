// ============================================================================
// ARCHIVO: Footer.jsx
//
// DESCRIPCIÓN:
// Pie de página con información de contacto y navegación de la óptica.
// ============================================================================

import "./Footer.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { SiAmericanexpress, SiVisa } from "react-icons/si";
import logoOptica from "../../assets/logo/logo-optica-transparente.png";
import addiLogo from "../../assets/payments/addi-logo.svg";
import mastercardLogo from "../../assets/payments/mastercard-logo.svg";
import pseLogo from "../../assets/payments/pse-logo.svg";

function Footer() {
    return (
        <footer className="footer" id="contacto">
            <div className="footer-container">
                <div className="footer-brand">
                    <img src={logoOptica} alt="Óptica Lentes J.L" />
                    <p>
                        Cuidamos tu salud visual con atención profesional,
                        productos de calidad y soluciones pensadas para ti.
                    </p>
                </div>

                <div className="footer-links">
                    <h2>Enlaces</h2>
                    <nav aria-label="Navegación del pie de página">
                        <a href="#servicios">Servicios</a>
                        <a href="#promociones">Promociones</a>
                        <a href="#testimonios">Testimonios</a>
                    </nav>
                </div>

                <div className="footer-contact">
                    <h2>Contacto</h2>

                    <address>
                        <a href="tel:+576015550147">
                            <FaPhoneAlt aria-hidden="true" />
                            <span>(601) 555 0147</span>
                        </a>

                        <a href="mailto:contacto@opticalentesjl.com">
                            <FaEnvelope aria-hidden="true" />
                            <span>contacto@opticalentesjl.com</span>
                        </a>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Calle%2066%20%2311-50%2C%20Edificio%20Villonario%2C%20Bogot%C3%A1%2C%20Colombia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ver ubicación en Google Maps"
                        >
                            <FaMapMarkerAlt aria-hidden="true" />
                            <span>
                                Calle 66 #11-50<br />
                                Edificio Villonario, consultorio 308<br />
                                Bogotá, Colombia
                            </span>
                        </a>
                    </address>
                </div>

                <div className="footer-payments">
                    <h2>Métodos de pago</h2>

                    <div className="payment-methods" aria-label="Métodos de pago aceptados">
                        <div className="payment-method" title="Visa">
                            <SiVisa className="payment-logo payment-logo--visa" aria-hidden="true" />
                            <span className="sr-only">Visa</span>
                        </div>

                        <div className="payment-method" title="Mastercard">
                            <img
                                className="mastercard-logo"
                                src={mastercardLogo}
                                alt=""
                                aria-hidden="true"
                            />
                            <span className="sr-only">Mastercard</span>
                        </div>

                        <div className="payment-method" title="American Express">
                            <SiAmericanexpress className="payment-logo payment-logo--amex" aria-hidden="true" />
                            <span className="sr-only">American Express</span>
                        </div>

                        <div className="payment-method payment-method--addi" title="Addi">
                            <img className="addi-logo" src={addiLogo} alt="" aria-hidden="true" />
                            <span className="sr-only">Addi</span>
                        </div>

                        <div className="payment-method" title="PSE">
                            <img className="pse-logo" src={pseLogo} alt="" aria-hidden="true" />
                            <span className="sr-only">PSE</span>
                        </div>

                        <div className="payment-method payment-method--cash" title="Efectivo">
                            <BsCashCoin aria-hidden="true" />
                            <span>Efectivo</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Óptica Lentes J.L. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
