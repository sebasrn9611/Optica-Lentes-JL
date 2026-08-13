package com.opticalentesjl.backend.config;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.Product;
import com.opticalentesjl.backend.entity.User;

import com.opticalentesjl.backend.repository.ProductRepository;
import com.opticalentesjl.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;


// ============================================================================
// INICIALIZADOR DE DATOS
// ============================================================================

/*
 * Esta clase se ejecuta automáticamente cuando Spring Boot inicia.
 *
 * Su función es garantizar que existan:
 *
 * 1. El administrador principal.
 * 2. Los productos iniciales de la óptica.
 *
 * Si los productos ya existen en MySQL, NO los vuelve a crear.
 */

@Component
public class DataInitializer implements CommandLineRunner {


    // =========================================================================
    // REPOSITORIOS Y SEGURIDAD
    // =========================================================================

    // Repositorio para trabajar con usuarios.
    private final UserRepository userRepository;

    // Repositorio para trabajar con productos.
    private final ProductRepository productRepository;

    // BCrypt para proteger las contraseñas.
    private final PasswordEncoder passwordEncoder;


    // =========================================================================
    // VARIABLES DE CONFIGURACIÓN DEL ADMINISTRADOR
    // =========================================================================

    /*
     * Estos valores se obtienen desde application.properties.
     *
     * En producción vienen desde las variables
     * configuradas en Railway.
     */

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.name}")
    private String adminName;


    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    public DataInitializer(
            UserRepository userRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;

        this.productRepository = productRepository;

        this.passwordEncoder = passwordEncoder;
    }


    // =========================================================================
    // EJECUCIÓN AUTOMÁTICA
    // =========================================================================

    @Override
    public void run(String... args) {

        /*
         * Primero verificamos el administrador.
         */
        configurarAdministrador();


        /*
         * Después comprobamos los productos iniciales.
         *
         * Cada producto se crea únicamente
         * si todavía no existe en MySQL.
         */

        crearMonturaEleganceSiNoExiste();

        crearGafasDeSolSiNoExisten();

        crearLentesFormuladosSiNoExisten();

        crearGafasDeportivasSiNoExisten();


        System.out.println(
                "Inicialización de datos completada correctamente."
        );
    }


    // =========================================================================
    // CONFIGURAR ADMINISTRADOR
    // =========================================================================

    private void configurarAdministrador() {

        /*
         * Buscamos al administrador por correo.
         */
        User admin = userRepository
                .findByEmail(adminEmail)
                .orElse(null);


        // =====================================================================
        // EL ADMINISTRADOR NO EXISTE
        // =====================================================================

        if (admin == null) {

            User nuevoAdmin = new User();


            // Nombre del administrador.
            nuevoAdmin.setName(adminName);


            // Correo.
            nuevoAdmin.setEmail(adminEmail);


            /*
             * Convertimos la contraseña recibida
             * desde Railway en un hash BCrypt.
             */
            nuevoAdmin.setPassword(
                    passwordEncoder.encode(adminPassword)
            );


            // Rol.
            nuevoAdmin.setRole("ADMIN");


            // Usuario activo.
            nuevoAdmin.setActive(true);


            // Guardamos en MySQL.
            userRepository.save(nuevoAdmin);


            System.out.println(
                    "Administrador inicial creado correctamente."
            );

            return;
        }


        // =====================================================================
        // EL ADMINISTRADOR YA EXISTE
        // =====================================================================

        /*
         * Comprobamos si la contraseña configurada actualmente
         * en Railway coincide con la contraseña almacenada.
         *
         * Si ya coincide, NO hacemos nada.
         *
         * Si cambias ADMIN_PASSWORD en Railway,
         * entonces se actualizará automáticamente.
         */

        boolean passwordActualizada =
                passwordEncoder.matches(
                        adminPassword,
                        admin.getPassword()
                );


        if (!passwordActualizada) {

            admin.setPassword(
                    passwordEncoder.encode(adminPassword)
            );

            userRepository.save(admin);


            System.out.println(
                    "Contraseña del administrador actualizada correctamente."
            );

        } else {

            System.out.println(
                    "Administrador verificado correctamente."
            );
        }
    }


    // =========================================================================
    // MONTURA ELEGANCE
    // =========================================================================

    private void crearMonturaEleganceSiNoExiste() {

        crearProductoSiNoExiste(

                "Montura Elegance",

                "Montura elegante y moderna, diseñada para brindar comodidad, " +
                        "estilo y una excelente adaptación para lentes formulados.",

                new BigDecimal("189000"),

                "montura1.jpg",

                "Monturas",

                10
        );
    }


    // =========================================================================
    // GAFAS DE SOL
    // =========================================================================

    private void crearGafasDeSolSiNoExisten() {

        crearProductoSiNoExiste(

                "Gafas de Sol",

                "Gafas de sol modernas con protección para los rayos UV, " +
                        "diseñadas para combinar comodidad, protección y estilo.",

                new BigDecimal("225000"),

                "montura2.jpg",

                "Gafas de sol",

                28
        );
    }


    // =========================================================================
    // LENTES FORMULADOS
    // =========================================================================

    private void crearLentesFormuladosSiNoExisten() {

        crearProductoSiNoExiste(

                "Lentes Formulados",

                "Lentes formulados personalizados de acuerdo con las necesidades " +
                        "visuales del paciente, ofreciendo comodidad y claridad.",

                new BigDecimal("160000"),

                "lentes.jpg",

                "Lentes formulados",

                30
        );
    }


    // =========================================================================
    // GAFAS DEPORTIVAS
    // =========================================================================

    private void crearGafasDeportivasSiNoExisten() {

        crearProductoSiNoExiste(

                "Gafas deportivas Velocity",

                "Diseño envolvente, montura liviana y lente espejado " +
                        "con protección UV para correr, montar bicicleta " +
                        "y entrenar al aire libre.",

                new BigDecimal("189900"),

                "gafas-deportivas.png",

                "Gafas deportivas",

                12
        );
    }


    // =========================================================================
    // MÉTODO REUTILIZABLE PARA CREAR PRODUCTOS
    // =========================================================================

    /*
     * Este método evita repetir todo el código
     * necesario para crear cada producto.
     *
     * Recibe:
     *
     * nombre
     * descripción
     * precio
     * imagen
     * categoría
     * stock
     */

    private void crearProductoSiNoExiste(
            String nombre,
            String descripcion,
            BigDecimal precio,
            String imagen,
            String categoria,
            int stock
    ) {


        // =====================================================================
        // COMPROBAR SI YA EXISTE
        // =====================================================================

        /*
         * Si MySQL ya contiene un producto
         * con este nombre, no lo duplicamos.
         */

        if (productRepository.existsByNameIgnoreCase(nombre)) {

            System.out.println(
                    "Producto ya existente: " + nombre
            );

            return;
        }


        // =====================================================================
        // CREAR PRODUCTO
        // =====================================================================

        Product producto = new Product();


        // Nombre.
        producto.setName(nombre);


        // Descripción.
        producto.setDescription(descripcion);


        // Precio.
        producto.setPrice(precio);


        /*
         * Guardamos solamente el nombre del archivo.
         *
         * React se encarga posteriormente
         * de relacionarlo con la imagen correspondiente.
         */
        producto.setImage(imagen);


        // Categoría.
        producto.setCategory(categoria);


        // Cantidad disponible.
        producto.setStock(stock);


        // Producto visible/activo.
        producto.setActive(true);


        // Guardamos en MySQL.
        productRepository.save(producto);


        System.out.println(
                "Producto inicial creado: " + nombre
        );
    }
}