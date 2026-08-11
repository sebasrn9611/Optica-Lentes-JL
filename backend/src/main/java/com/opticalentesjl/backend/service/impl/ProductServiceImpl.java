package com.opticalentesjl.backend.service.impl;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.Product;
import com.opticalentesjl.backend.repository.ProductRepository;
import com.opticalentesjl.backend.service.ProductService;

import org.springframework.stereotype.Service;

import java.util.List;

// ============================================================================
// IMPLEMENTACIÓN DEL SERVICIO
// ============================================================================

/*
 * @Service registra esta clase como un servicio
 * administrado por Spring Boot.
 */
@Service
public class ProductServiceImpl implements ProductService {

    /*
     * Repositorio utilizado para acceder
     * a la base de datos.
     */
    private final ProductRepository productRepository;

    /*
     * Constructor con inyección de dependencias.
     *
     * Spring Boot crea automáticamente
     * el ProductRepository.
     */
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /*
     * Devuelve todos los productos.
     */
    @Override
    public List<Product> findAll() {

        return productRepository.findAll();

    }

    /*
     * Busca un producto por ID.
     */
    @Override
    public Product findById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado."));

    }

    /*
     * Guarda un producto.
     */
    @Override
    public Product save(Product product) {

        return productRepository.save(product);

    }

    /*
     * Actualiza un producto.
     */
    @Override
    public Product update(Long id, Product product) {

        Product existente = findById(id);

        existente.setName(product.getName());
        existente.setDescription(product.getDescription());
        existente.setPrice(product.getPrice());
        existente.setImage(product.getImage());
        existente.setCategory(product.getCategory());
        existente.setStock(product.getStock());
        existente.setActive(product.getActive());

        return productRepository.save(existente);

    }

    /*
     * Elimina un producto.
     */
    @Override
    public void delete(Long id) {

        Product existente = findById(id);

        productRepository.delete(existente);

    }

}