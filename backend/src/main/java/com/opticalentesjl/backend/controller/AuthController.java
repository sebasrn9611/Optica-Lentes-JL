package com.opticalentesjl.backend.controller;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.dto.LoginRequest;
import com.opticalentesjl.backend.dto.LoginResponse;

import com.opticalentesjl.backend.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


// ============================================================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================================================

@RestController

@RequestMapping("/api/auth")


public class AuthController {


    private final AuthService authService;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    public AuthController(AuthService authService) {

        this.authService = authService;
    }


    // ========================================================================
    // LOGIN
    // ========================================================================

    @PostMapping("/login")

    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                authService.login(request);


        /*
         * Si las credenciales son incorrectas,
         * respondemos HTTP 401.
         */
        if (!response.isSuccess()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }


        /*
         * Login correcto → HTTP 200.
         */
        return ResponseEntity.ok(response);
    }
}