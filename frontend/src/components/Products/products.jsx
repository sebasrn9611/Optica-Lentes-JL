// ============================================================================
// ARCHIVO: Products.jsx
//
// DESCRIPCIÓN:
// Muestra los productos obtenidos desde Spring Boot y MySQL.
// También controla los estados de carga, error y catálogo vacío.
// ============================================================================

// useEffect permite ejecutar la consulta al cargar el componente.
import { useEffect, useState } from "react";

// Importamos los estilos del componente.
import "./Products.css";

// Importamos la función que consulta los productos.
import { getProducts } from "../../services/productService";

// Importamos las imágenes locales.
// Por ahora, MySQL guardará solamente el nombre del archivo.
import monturaElegance from "../../assets/images/products/montura1.jpg";
import gafasSol from "../../assets/images/products/montura2.jpg";
import lentesFormulados from "../../assets/images/products/lentes.jpg";
import gafasDeportivas from "../../assets/images/products/gafas-deportivas.png";

// Creamos un mapa para relacionar el nombre guardado en MySQL
// con la imagen importada dentro del proyecto React.
const productImages = {
    "montura1.jpg": monturaElegance,
    "montura2.jpg": gafasSol,
    "lentes.jpg": lentesFormulados,
    "gafas-deportivas.png": gafasDeportivas
};

// Función que determina qué imagen mostrar.
const getProductImage = (imageName) => {
    // Si el nombre existe dentro del mapa, devolvemos su imagen.
    return productImages[imageName] || lentesFormulados;
};

// Función que convierte el precio al formato de moneda colombiana.
const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(price);
};

// Creamos el componente.
function Products() {
    // Guarda la lista de productos enviada por el backend.
    const [products, setProducts] = useState([]);

    // Indica si la consulta sigue ejecutándose.
    const [loading, setLoading] = useState(true);

    // Guarda un posible mensaje de error.
    const [error, setError] = useState("");

    // Se ejecuta una vez cuando el componente aparece en pantalla.
    useEffect(() => {
        // Creamos una función asíncrona para consultar el backend.
        const loadProducts = async () => {
            try {
                // Activamos el estado de carga.
                setLoading(true);

                // Limpiamos errores anteriores.
                setError("");

                // Solicitamos los productos al backend.
                const data = await getProducts();

                // Guardamos el resultado recibido.
                setProducts(data);
            } catch (requestError) {
                // Mostramos el error en la consola para depuración.
                console.error(
                    "Error al consultar los productos:",
                    requestError
                );

                // Mostramos un mensaje comprensible para el usuario.
                setError(
                    "No fue posible cargar los productos. Verifica que el backend esté ejecutándose."
                );
            } finally {
                // Finalizamos el estado de carga.
                setLoading(false);
            }
        };

        // Ejecutamos la función.
        loadProducts();
    }, []);

    return (
        // El identificador permite navegar hasta esta sección.
        <section className="products" id="productos">

            {/* Encabezado principal */}
            <div className="products-header">
                <span className="products-eyebrow">
                    Productos destacados
                </span>

                <h2>
                    Encuentra el estilo y la visión que van contigo
                </h2>

                <p>
                    Descubre nuestra selección de monturas y lentes,
                    pensados para brindarte comodidad, calidad y
                    protección visual.
                </p>
            </div>

            {/* Mensaje mientras se consulta el backend */}
            {loading && (
                <div className="products-status">
                    Cargando productos...
                </div>
            )}

            {/* Mensaje cuando ocurre un error */}
            {!loading && error && (
                <div className="products-status products-error">
                    {error}
                </div>
            )}

            {/* Mensaje cuando la tabla está vacía */}
            {!loading && !error && products.length === 0 && (
                <div className="products-status">
                    Todavía no hay productos registrados.
                </div>
            )}

            {/* Cuadrícula de productos */}
            {!loading && !error && products.length > 0 && (
                <div className="products-container">

                    {/* Generamos una tarjeta por cada producto */}
                    {products.map((product) => (
                        <article
                            className="product-card"
                            key={product.id}
                        >
                            {/* Imagen del producto */}
                            <div className="product-image-container">
                                <img
                                    src={getProductImage(product.image)}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>

                            {/* Información del producto */}
                            <div className="product-content">

                                {/* Categoría */}
                                <span className="product-category">
                                    {product.category}
                                </span>

                                {/* Nombre */}
                                <h3>{product.name}</h3>

                                {/* Descripción */}
                                <p>{product.description}</p>

                                {/* Precio */}
                                <strong className="product-price">
                                    {formatPrice(product.price)}
                                </strong>

                                {/* Disponibilidad */}
                                <span
                                    className={
                                        product.stock > 0
                                            ? "product-stock available"
                                            : "product-stock unavailable"
                                    }
                                >
                                    {product.stock > 0
                                        ? `${product.stock} unidades disponibles`
                                        : "Producto agotado"}
                                </span>

                                {/* Botón temporal */}
                                <button
                                    type="button"
                                    disabled={
                                        !product.active ||
                                        product.stock === 0
                                    }
                                >
                                    {product.active &&
                                    product.stock > 0
                                        ? "Ver producto"
                                        : "No disponible"}
                                </button>

                            </div>
                        </article>
                    ))}

                </div>
            )}

        </section>
    );
}

// Exportamos el componente.
export default Products;
