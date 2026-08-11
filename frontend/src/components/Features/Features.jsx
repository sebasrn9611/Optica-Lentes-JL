// ============================================================================
// ARCHIVO: Features.jsx
//
// DESCRIPCIÓN:
// Este componente muestra las ventajas principales de la óptica.
// Utilizamos un arreglo y el método map() para generar cada tarjeta.
// ============================================================================

// Importamos los estilos.
import "./Features.css";

// Importamos iconos.
import {

    FaAward,

    FaUserMd,

    FaHeart,

    FaShieldAlt

} from "react-icons/fa";

// Información de las ventajas.
const features = [

    {

        id:1,

        icon:<FaAward />,

        title:"Calidad Garantizada",

        description:"Trabajamos con productos certificados de excelente calidad."

    },

    {

        id:2,

        icon:<FaUserMd />,

        title:"Profesionales",

        description:"Especialistas preparados para cuidar tu salud visual."

    },

    {

        id:3,

        icon:<FaHeart />,

        title:"Atención Personalizada",

        description:"Cada cliente recibe asesoría según sus necesidades."

    },

    {

        id:4,

        icon:<FaShieldAlt />,

        title:"Garantía",

        description:"Todos nuestros productos cuentan con garantía."

    }

];

// Componente.
function Features(){

    return(

        // El id permite enlazar esta sección desde otros componentes.
        <section className="features" id="ventajas">

            <h2>

                ¿Por qué elegir Óptica Lentes J.L?

            </h2>

            <div className="features-container">

                {features.map(feature=>(

                    <div
                        key={feature.id}
                        className="feature-card"
                    >

                        <div className="feature-icon">

                            {feature.icon}

                        </div>

                        <h3>

                            {feature.title}

                        </h3>

                        <p>

                            {feature.description}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Features;
