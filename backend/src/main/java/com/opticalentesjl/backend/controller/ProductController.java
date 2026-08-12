package com.opticalentesjl.backend.controller;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.Product;
import com.opticalentesjl.backend.service.ProductService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


// ============================================================================
// CONTROLADOR DE PRODUCTOS
// ============================================================================

/*
 * Este controlador recibe todas las peticiones
 * relacionadas con productos.
 */
@RestController

/*
 * Todas las rutas comenzarán con:
 *
 * /api/products
 */
@RequestMapping("/api/products")

/*
 * Permitimos temporalmente las peticiones
 * desde nuestro Frontend React.
 */



public class ProductController {

    /*
     * Servicio encargado de la lógica del negocio.
     */
    private final ProductService productService;

    /*
     * Constructor.
     */
    public ProductController(ProductService productService) {

        this.productService = productService;

    }

    /*
     * ============================================================
     * LISTAR TODOS
     * ============================================================
     */

    @GetMapping

    public ResponseEntity<List<Product>> findAll() {

        return ResponseEntity.ok(

                productService.findAll()

        );

    }

    /*
     * ============================================================
     * BUSCAR POR ID
     * ============================================================
     */

    @GetMapping("/{id}")

    public ResponseEntity<Product> findById(

            @PathVariable Long id

    ) {

        return ResponseEntity.ok(

                productService.findById(id)

        );

    }

    /*
     * ============================================================
     * CREAR PRODUCTO
     * ============================================================
     */

    @PostMapping

    public ResponseEntity<Product> save(

            @RequestBody Product product

    ) {

        Product nuevo = productService.save(product);

        return ResponseEntity

                .status(HttpStatus.CREATED)

                .body(nuevo);

    }

    /*
     * ============================================================
     * ACTUALIZAR PRODUCTO
     * ============================================================
     */

    @PutMapping("/{id}")

    public ResponseEntity<Product> update(

            @PathVariable Long id,

            @RequestBody Product product

    ) {

        return ResponseEntity.ok(

                productService.update(id, product)

        );

    }

    /*
     * ============================================================
     * ELIMINAR PRODUCTO
     * ============================================================
     */

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> delete(

            @PathVariable Long id

    ) {

        productService.delete(id);

        return ResponseEntity.noContent().build();

    }
}
