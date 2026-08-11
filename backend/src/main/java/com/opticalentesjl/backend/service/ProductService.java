package com.opticalentesjl.backend.service;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.Product;

import java.util.List;


// ============================================================================
// SERVICIO DE PRODUCTOS
// ============================================================================

/*
 * Esta interfaz define todas las operaciones
 * que podrá realizar el módulo de productos.
 *
 * Aquí solamente declaramos los métodos.
 *
 * La implementación se realizará posteriormente
 * en ProductServiceImpl.
 */
public interface ProductService {

    /*
     * Devuelve todos los productos.
     */
    List<Product> findAll();

    /*
     * Busca un producto por su identificador.
     */
    Product findById(Long id);

    /*
     * Guarda un producto.
     */
    Product save(Product product);

    /*
     * Actualiza un producto.
     */
    Product update(
            Long id,
            Product product
    );

    /*
     * Elimina un producto.
     */
    void delete(Long id);

}