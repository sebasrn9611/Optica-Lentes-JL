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

@Component
public class DataInitializer implements CommandLineRunner {

    // Repositorio para trabajar con usuarios.
    private final UserRepository userRepository;

    // Repositorio para trabajar con productos.
    private final ProductRepository productRepository;

    // BCrypt para proteger las contraseñas.
    private final PasswordEncoder passwordEncoder;


    // ========================================================================
    // VARIABLES DE CONFIGURACIÓN
    // ========================================================================

    /*
     * Estas variables vienen desde application.properties
     * y, en producción, desde Railway.
     */

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.name}")
    private String adminName;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    public DataInitializer(
            UserRepository userRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // ========================================================================
    // EJECUCIÓN AUTOMÁTICA AL INICIAR SPRING BOOT
    // ========================================================================

    @Override
    public void run(String... args) {

        /*
         * Primero configuramos o actualizamos
         * el administrador.
         */
        configurarAdministrador();


        /*
         * Después verificamos si debe existir
         * el producto inicial.
         */
        crearGafasDeportivasSiNoExisten();
    }


    // ========================================================================
    // CONFIGURAR ADMINISTRADOR
    // ========================================================================

    private void configurarAdministrador() {

        /*
         * Buscamos el administrador utilizando
         * el correo configurado.
         */
        User admin = userRepository
                .findByEmail(adminEmail)
                .orElse(null);


        // ====================================================================
        // SI EL ADMINISTRADOR NO EXISTE
        // ====================================================================

        if (admin == null) {

            admin = new User();

            // Nombre.
            admin.setName(adminName);

            // Correo.
            admin.setEmail(adminEmail);

            /*
             * Convertimos la contraseña en un hash BCrypt
             * antes de guardarla.
             */
            admin.setPassword(
                    passwordEncoder.encode(adminPassword)
            );

            // Rol administrativo.
            admin.setRole("ADMIN");

            // Usuario activo.
            admin.setActive(true);

            // Guardamos en MySQL.
            userRepository.save(admin);

            System.out.println(
                    "Administrador inicial creado correctamente."
            );

            return;
        }


        // ====================================================================
        // SI EL ADMINISTRADOR YA EXISTE
        // ====================================================================

        /*
         * Actualizamos su contraseña usando el valor actual
         * de ADMIN_PASSWORD configurado en Railway.
         */
        admin.setPassword(
                passwordEncoder.encode(adminPassword)
        );

        userRepository.save(admin);

        System.out.println(
                "Contraseña del administrador actualizada correctamente."
        );
    }


    // ========================================================================
    // CREAR PRODUCTO INICIAL
    // ========================================================================

    private void crearGafasDeportivasSiNoExisten() {

        String nombre =
                "Gafas deportivas Velocity";


        /*
         * Si el producto ya existe,
         * no hacemos nada.
         */
        if (productRepository.existsByNameIgnoreCase(nombre)) {
            return;
        }


        /*
         * Si no existe, lo creamos.
         */
        Product producto = new Product();

        producto.setName(nombre);

        producto.setDescription(
                "Diseño envolvente, montura liviana y lente espejado " +
                "con protección UV para correr, montar bicicleta " +
                "y entrenar al aire libre."
        );

        producto.setPrice(
                new BigDecimal("189900")
        );

        producto.setImage(
                "gafas-deportivas.png"
        );

        producto.setCategory(
                "Gafas deportivas"
        );

        producto.setStock(12);

        producto.setActive(true);


        // Guardamos el producto.
        productRepository.save(producto);

        System.out.println(
                "Producto inicial creado correctamente."
        );
    }
}