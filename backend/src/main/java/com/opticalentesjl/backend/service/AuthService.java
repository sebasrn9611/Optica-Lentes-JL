package com.opticalentesjl.backend.service;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.dto.LoginRequest;
import com.opticalentesjl.backend.dto.LoginResponse;

import com.opticalentesjl.backend.entity.User;
import com.opticalentesjl.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.util.Optional;


// ============================================================================
// SERVICIO DE AUTENTICACIÓN
// ============================================================================

@Service
public class AuthService {

    // Repositorio para consultar usuarios en MySQL.
    private final UserRepository userRepository;

    // Encoder utilizado para comparar contraseñas BCrypt.
    private final PasswordEncoder passwordEncoder;

    // Servicio encargado de generar el JWT.
    private final TokenService tokenService;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService
    ) {

        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;

        this.tokenService = tokenService;
    }


    // ========================================================================
    // LOGIN
    // ========================================================================

    public LoginResponse login(LoginRequest request) {

        /*
         * Buscamos al usuario utilizando el correo electrónico.
         */
        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );


        // --------------------------------------------------------------------
        // USUARIO NO EXISTE
        // --------------------------------------------------------------------

        if (optionalUser.isEmpty()) {

            return new LoginResponse(
                    false,
                    "Correo o contraseña incorrectos.",
                    null,
                    null,
                    null,
                    null
            );
        }


        // Obtenemos el usuario encontrado.
        User user = optionalUser.get();


        // --------------------------------------------------------------------
        // USUARIO DESACTIVADO
        // --------------------------------------------------------------------

        if (!Boolean.TRUE.equals(user.getActive())) {

            return new LoginResponse(
                    false,
                    "El usuario se encuentra desactivado.",
                    null,
                    null,
                    null,
                    null
            );
        }


        // --------------------------------------------------------------------
        // COMPROBAR CONTRASEÑA
        // --------------------------------------------------------------------

        /*
         * La contraseña guardada en MySQL está cifrada con BCrypt.
         *
         * passwordEncoder.matches():
         *
         * 1. Recibe la contraseña escrita por el usuario.
         * 2. Recibe el hash guardado en MySQL.
         * 3. Comprueba si corresponden.
         */
        boolean passwordCorrect =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );


        // --------------------------------------------------------------------
        // CONTRASEÑA INCORRECTA
        // --------------------------------------------------------------------

        if (!passwordCorrect) {

            return new LoginResponse(
                    false,
                    "Correo o contraseña incorrectos.",
                    null,
                    null,
                    null,
                    null
            );
        }


        // ====================================================================
        // LOGIN CORRECTO
        // ====================================================================

        /*
         * Como las credenciales son correctas,
         * generamos un JWT para este usuario.
         */
        String token =
                tokenService.generateToken(user);


        /*
         * Devolvemos la información del administrador
         * junto con el JWT.
         *
         * Nunca devolvemos la contraseña.
         */
        return new LoginResponse(
                true,
                "Inicio de sesión correcto.",
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }
}