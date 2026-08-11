package com.opticalentesjl.backend.repository;

// ============================================================================
// IMPORTACIONES
// ============================================================================

// Importamos la entidad Product.
import com.opticalentesjl.backend.entity.Product;

// JpaRepository contiene las operaciones CRUD básicas.
import org.springframework.data.jpa.repository.JpaRepository;

// Importamos Optional para búsquedas que podrían no devolver resultados.
import java.util.Optional;


// ============================================================================
// REPOSITORIO DE PRODUCTOS
// ============================================================================

/*
 * Esta interfaz se encarga de acceder a los datos de Product.
 *
 * JpaRepository recibe dos tipos:
 *
 * Product:
 * Es la entidad que administrará.
 *
 * Long:
 * Es el tipo de dato del identificador de Product.
 */

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    /*
     * Spring Data JPA interpreta automáticamente el nombre del metodo.
     *
     * Buscará un producto por su nombre ignorando mayúsculas
     * y minúsculas.
     *
     * Ejemplo:
     *
     * "Montura Elegance"
     * "montura elegance"
     *
     * serán consideradas equivalentes.
     */
    Optional<Product> findByNameIgnoreCase(String name);

    /*
     * Permite comprobar si ya existe un producto
     * registrado con el mismo nombre.
     */
    boolean existsByNameIgnoreCase(String name);
}
