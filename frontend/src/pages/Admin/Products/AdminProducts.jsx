// ============================================================================
// ARCHIVO: AdminProducts.jsx
//
// DESCRIPCIÓN:
// Gestión administrativa completa de productos.
// Permite crear, consultar, editar y eliminar productos.
// ============================================================================

import { useEffect, useState } from "react";

import "./AdminProducts.css";

// Importamos todas las operaciones CRUD.
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct
} from "../../../services/productService";


function AdminProducts() {

    // =========================================================================
    // ESTADOS
    // =========================================================================

    // Productos obtenidos desde Spring Boot.
    const [products, setProducts] = useState([]);

    // ID del producto que estamos editando.
    // null significa que estamos creando uno nuevo.
    const [editingId, setEditingId] = useState(null);

    // Mensaje para informar al administrador.
    const [message, setMessage] = useState("");

    // Datos del formulario.
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        active: true
    });


    // =========================================================================
    // CARGAR PRODUCTOS
    // =========================================================================

    useEffect(() => {
        loadProducts();
    }, []);


    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(
                "Error cargando productos:",
                error
            );

            setMessage(
                "No fue posible cargar los productos."
            );
        }
    };


    // =========================================================================
    // MANEJAR CAMPOS DEL FORMULARIO
    // =========================================================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setFormData({
            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };


    // =========================================================================
    // LIMPIAR FORMULARIO
    // =========================================================================

    const resetForm = () => {

        setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
            stock: "",
            active: true
        });

        // Salimos del modo edición.
        setEditingId(null);
    };


    // =========================================================================
    // GUARDAR O ACTUALIZAR
    // =========================================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        // Convertimos precio y stock a valores numéricos.
        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        };

        try {

            // ---------------------------------------------------------------
            // SI EXISTE editingId → ACTUALIZAMOS
            // ---------------------------------------------------------------

            if (editingId !== null) {

                await updateProduct(
                    editingId,
                    productData
                );

                setMessage(
                    "Producto actualizado correctamente."
                );

            } else {

                // -----------------------------------------------------------
                // SI NO EXISTE editingId → CREAMOS
                // -----------------------------------------------------------

                await createProduct(productData);

                setMessage(
                    "Producto registrado correctamente."
                );
            }

            // Limpiamos el formulario.
            resetForm();

            // Volvemos a consultar MySQL.
            await loadProducts();

        } catch (error) {

            console.error(
                "Error guardando producto:",
                error
            );

            setMessage(
                "No fue posible guardar el producto."
            );
        }
    };


    // =========================================================================
    // EDITAR PRODUCTO
    // =========================================================================

    const handleEdit = (product) => {

        // Guardamos el ID que vamos a modificar.
        setEditingId(product.id);

        // Colocamos los datos existentes dentro del formulario.
        setFormData({
            name: product.name ?? "",
            description: product.description ?? "",
            price: product.price ?? "",
            image: product.image ?? "",
            category: product.category ?? "",
            stock: product.stock ?? "",
            active: product.active ?? true
        });

        setMessage(
            `Editando: ${product.name}`
        );

        // Subimos hasta el formulario.
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================================================================
    // CANCELAR EDICIÓN
    // =========================================================================

    const handleCancelEdit = () => {

        resetForm();

        setMessage(
            "Edición cancelada."
        );
    };


    // =========================================================================
    // ELIMINAR PRODUCTO
    // =========================================================================

    const handleDelete = async (product) => {

        // Pedimos confirmación antes de eliminar.
        const confirmed = window.confirm(
            `¿Seguro que deseas eliminar "${product.name}"?`
        );

        // Si el administrador cancela, no hacemos nada.
        if (!confirmed) {
            return;
        }

        try {

            // DELETE /api/products/{id}
            await deleteProduct(product.id);

            setMessage(
                "Producto eliminado correctamente."
            );

            // Si estábamos editando ese producto,
            // limpiamos también el formulario.
            if (editingId === product.id) {
                resetForm();
            }

            // Actualizamos la tabla.
            await loadProducts();

        } catch (error) {

            console.error(
                "Error eliminando producto:",
                error
            );

            setMessage(
                "No fue posible eliminar el producto."
            );
        }
    };


    // =========================================================================
    // INTERFAZ
    // =========================================================================

    return (

        <main className="admin-products-page">

            {/* ==============================================================
                ENCABEZADO
               ============================================================== */}

            <header className="admin-products-header">

                <span>
                    Gestión administrativa
                </span>

                <h1>
                    Productos
                </h1>

                <p>
                    Registra, consulta, edita y elimina los productos
                    disponibles en la óptica.
                </p>

            </header>


            <div className="admin-products-grid">


                {/* ==========================================================
                    FORMULARIO
                   ========================================================== */}

                <section className="admin-products-panel">

                    <h2>
                        {editingId !== null
                            ? "Editar producto"
                            : "Registrar producto"}
                    </h2>


                    <form
                        className="admin-product-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Nombre */}
                        <div className="admin-product-field">

                            <label htmlFor="name">
                                Nombre
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Descripción */}
                        <div className="admin-product-field">

                            <label htmlFor="description">
                                Descripción
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Precio */}
                        <div className="admin-product-field">

                            <label htmlFor="price">
                                Precio
                            </label>

                            <input
                                id="price"
                                name="price"

                                // Usamos texto para poder mostrar el formato colombiano.
                                type="text"

                                // Abre teclado numérico en dispositivos móviles.
                                inputMode="numeric"

                                // Ejemplo visual para el administrador.
                                placeholder="$ 120.000"

                                // Mostramos el precio con separadores de miles.
                                value={
                                    formData.price
                                        ? `$ ${Number(formData.price).toLocaleString("es-CO")}`
                                        : ""
                                }

                                // Limpiamos cualquier punto, símbolo $ o espacio.
                                onChange={(event) => {

                                    const precioLimpio =
                                        event.target.value.replace(/\D/g, "");

                                    setFormData({
                                        ...formData,
                                        price: precioLimpio
                                    });
                                }}

                                required
                            />

                        </div>


                        {/* Imagen */}
                        <div className="admin-product-field">

                            <label htmlFor="image">
                                Nombre de imagen
                            </label>

                            <input
                                id="image"
                                name="image"
                                type="text"
                                placeholder="montura1.jpg"
                                value={formData.image}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Categoría */}
                        <div className="admin-product-field">

                            <label htmlFor="category">
                                Categoría
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Selecciona una categoría
                                </option>
                                <option value="Monturas">Monturas</option>
                                <option value="Gafas de sol">Gafas de sol</option>
                                <option value="Gafas deportivas">Gafas deportivas</option>
                                <option value="Lentes formulados">Lentes formulados</option>
                            </select>

                        </div>


                        {/* Stock */}
                        <div className="admin-product-field">

                            <label htmlFor="stock">
                                Stock
                            </label>

                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Producto activo */}
                        <label className="admin-product-checkbox">

                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />

                            Producto activo

                        </label>


                        {/* Mensajes */}
                        {message && (

                            <p className="admin-product-message">
                                {message}
                            </p>

                        )}


                        {/* Botón principal */}
                        <button
                            type="submit"
                            className="admin-product-submit"
                        >

                            {editingId !== null
                                ? "Actualizar producto"
                                : "Guardar producto"}

                        </button>


                        {/* Cancelar edición */}
                        {editingId !== null && (

                            <button
                                type="button"
                                className="admin-product-cancel"
                                onClick={handleCancelEdit}
                            >
                                Cancelar edición
                            </button>

                        )}

                    </form>

                </section>


                {/* ==========================================================
                    TABLA
                   ========================================================== */}

                <section className="admin-products-panel">

                    <h2>
                        Productos registrados
                    </h2>


                    <div className="admin-products-table-wrapper">

                        <table className="admin-products-table">

                            <thead>

                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>

                                    {/* NUEVA COLUMNA */}
                                    <th>Acciones</th>
                                </tr>

                            </thead>


                            <tbody>

                                {products.map((product) => (

                                    <tr key={product.id}>

                                        {/* Nombre */}
                                        <td>
                                            {product.name}
                                        </td>


                                        {/* Precio */}
                                        <td>

                                            ${Number(
                                                product.price
                                            ).toLocaleString(
                                                "es-CO"
                                            )}

                                        </td>


                                        {/* Stock */}
                                        <td>
                                            {product.stock}
                                        </td>


                                        {/* Estado */}
                                        <td>

                                            {product.active
                                                ? "Activo"
                                                : "Inactivo"}

                                        </td>


                                        {/* Acciones */}
                                        <td>

                                            <div className="admin-product-actions">

                                                {/* EDITAR */}
                                                <button
                                                    type="button"
                                                    className="admin-product-edit"
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                {/* ELIMINAR */}
                                                <button
                                                    type="button"
                                                    className="admin-product-delete"
                                                    onClick={() =>
                                                        handleDelete(product)
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default AdminProducts;
