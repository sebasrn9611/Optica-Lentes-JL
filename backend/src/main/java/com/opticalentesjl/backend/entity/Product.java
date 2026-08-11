package com.opticalentesjl.backend.entity;

// ============================================================================
// IMPORTACIONES
// ============================================================================

// Estas anotaciones permiten convertir esta clase en una tabla de la BD.
import jakarta.persistence.*;

// BigDecimal se utiliza para valores monetarios.
import java.math.BigDecimal;

// Lombok genera automáticamente getters, setters y constructores.
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


// ============================================================================
// ENTIDAD PRODUCTO
// ============================================================================

/*
 * @Entity indica que esta clase representa una tabla
 * dentro de la Base de Datos.
 */
@Entity

/*
 * Nombre que tendrá la tabla.
 */
@Table(name = "products")

/*
 * Lombok genera automáticamente
 * todos los métodos get().
 */
@Getter

/*
 * Lombok genera automáticamente
 * todos los métodos set().
 */
@Setter

/*
 * Constructor vacío.
 * Hibernate lo necesita.
 */
@NoArgsConstructor

/*
 * Constructor con todos los atributos.
 */
@AllArgsConstructor

public class Product {

    /*
     * Llave primaria.
     */
    @Id

    /*
     * El ID será generado automáticamente
     * por MySQL.
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Nombre del producto.
     */
    @Column(nullable = false, length = 120)
    private String name;

    /*
     * Descripción.
     */
    @Column(nullable = false, length = 500)
    private String description;

    /*
     * Precio.
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /*
     * Imagen.
     */
    @Column(length = 255)
    private String image;

    /*
     * Categoría.
     */
    @Column(nullable = false, length = 60)
    private String category;

    /*
     * Cantidad disponible.
     */
    @Column(nullable = false)
    private Integer stock;

    /*
     * Producto activo.
     */
    @Column(nullable = false)
    private Boolean active;
}
