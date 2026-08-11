package com.opticalentesjl.backend.config;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.User;
import com.opticalentesjl.backend.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Component;


// ============================================================================
// INICIALIZADOR DE DATOS
// ============================================================================

/*
 * @Component permite que Spring detecte automáticamente esta clase.
 *
 * CommandLineRunner ejecuta el método run()
 * cuando Spring Boot termina de preparar el contexto.
 */
@Component
public class DataInitializer implements CommandLineRunner {


    // Repositorio para trabajar con la tabla users.
    private final UserRepository userRepository;


    // Encoder que configuramos utilizando BCrypt.
    private final PasswordEncoder passwordEncoder;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    /*
     * Spring inyecta automáticamente las dependencias.
     */
    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;
    }


    // ========================================================================
    // CREAR ADMINISTRADOR
    // ========================================================================

    @Override
    public void run(String... args) {

        /*
         * Correo inicial del administrador.
         */
        String adminEmail =
                "admin@opticalentesjl.com";


        /*
         * Solamente creamos el administrador
         * si todavía no existe.
         */
        if (!userRepository.existsByEmail(adminEmail)) {

            User admin = new User();

            // Nombre.
            admin.setName(
                    "Administrador Óptica Lentes J.L."
            );

            // Correo.
            admin.setEmail(adminEmail);


            /*
             * IMPORTANTE:
             *
             * La contraseña se convierte a BCrypt
             * antes de guardarse en MySQL.
             */
            admin.setPassword(
                    passwordEncoder.encode("Admin123*")
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
