// ============================================================================
// ARCHIVO: productService.js
//
// DESCRIPCIÓN:
// Servicio encargado de comunicarse con la API de Productos.
// ============================================================================

import api from "../api/api";

/*
 * Obtener todos los productos.
 */
export const getProducts = async () => {

    const response = await api.get("/products");

    return response.data;

};


/*
 * Buscar un producto por ID.
 */
export const getProductById = async (id) => {

    const response = await api.get(`/products/${id}`);

    return response.data;

};


/*
 * Crear un producto.
 */
export const createProduct = async (product) => {

    const response = await api.post("/products", product);

    return response.data;

};


/*
 * Actualizar un producto.
 */
export const updateProduct = async (id, product) => {

    const response = await api.put(`/products/${id}`, product);

    return response.data;

};


/*
 * Eliminar un producto.
 */
export const deleteProduct = async (id) => {

    await api.delete(`/products/${id}`);

};