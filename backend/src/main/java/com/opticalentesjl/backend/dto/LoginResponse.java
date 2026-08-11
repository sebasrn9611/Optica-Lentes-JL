package com.opticalentesjl.backend.dto;

// ============================================================================
// DTO - RESPUESTA DEL LOGIN
// ============================================================================

public class LoginResponse {

    // Indica si el inicio de sesión fue exitoso.
    private boolean success;

    // Mensaje que recibirá el frontend.
    private String message;

    // Nombre del usuario autenticado.
    private String name;

    // Correo del usuario.
    private String email;

    // Rol del usuario.
    private String role;

    // Token JWT que utilizará React para autenticarse.
    private String token;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    public LoginResponse(
            boolean success,
            String message,
            String name,
            String email,
            String role,
            String token
    ) {

        this.success = success;
        this.message = message;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }


    // ========================================================================
    // GETTERS
    // ========================================================================

    public boolean isSuccess() {
        return success;
    }


    public String getMessage() {
        return message;
    }


    public String getName() {
        return name;
    }


    public String getEmail() {
        return email;
    }


    public String getRole() {
        return role;
    }


    public String getToken() {
        return token;
    }
}