package com.opticalentesjl.backend.config;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.User;
import com.opticalentesjl.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Component;


// ============================================================================
// INICIALIZADOR DE DATOS
// ============================================================================

@Component
public class DataInitializer implements CommandLineRunner {

    // Repositorio de usuarios.
    private final UserRepository userRepository;

    // BCrypt.
    private final PasswordEncoder passwordEncoder;


    // ========================================================================
    // VARIABLES DE CONFIGURACIÓN
    // ========================================================================

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
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // ========================================================================
    // CREAR ADMINISTRADOR INICIAL
    // ========================================================================

    @Override
    public void run(String... args) {

        /*
         * Solo creamos el administrador
         * si todavía no existe.
         */
        if (!userRepository.existsByEmail(adminEmail)) {

            User admin = new User();

            // Nombre.
            admin.setName(adminName);

            // Correo.
            admin.setEmail(adminEmail);

            // Contraseña protegida con BCrypt.
            admin.setPassword(
                    passwordEncoder.encode(adminPassword)
            );

            // Rol.
            admin.setRole("ADMIN");

            // Usuario activo.
            admin.setActive(true);

            // Guardamos en MySQL.
            userRepository.save(admin);

            System.out.println(
                    "Administrador inicial creado correctamente."
            );
        }
    }
}