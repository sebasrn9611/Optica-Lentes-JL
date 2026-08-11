package com.opticalentesjl.backend.entity;

import jakarta.persistence.*;


// ============================================================================
// ENTIDAD USUARIO
// ============================================================================

/*
 * Representa los usuarios que pueden iniciar sesión
 * en el sistema.
 */
@Entity

/*
 * Nombre de la tabla en MySQL.
 */
@Table(name = "users")

public class User {


    // ========================================================================
    // ID
    // ========================================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ========================================================================
    // NOMBRE
    // ========================================================================

    @Column(nullable = false)
    private String name;


    // ========================================================================
    // CORREO
    // ========================================================================

    /*
     * unique = true evita que existan dos usuarios
     * registrados con el mismo correo.
     */
    @Column(
            nullable = false,
            unique = true
    )
    private String email;


    // ========================================================================
    // CONTRASEÑA
    // ========================================================================

    /*
     * Aquí NO guardaremos la contraseña original.
     *
     * Más adelante Spring Security + BCrypt
     * almacenarán la contraseña cifrada.
     */
    @Column(nullable = false)
    private String password;


    // ========================================================================
    // ROL
    // ========================================================================

    /*
     * Permitirá distinguir tipos de usuario.
     *
     * Ejemplo:
     * ADMIN
     */
    @Column(nullable = false)
    private String role;


    // ========================================================================
    // ESTADO
    // ========================================================================

    /*
     * Permite activar o desactivar una cuenta.
     */
    @Column(nullable = false)
    private Boolean active = true;


    // ========================================================================
    // CONSTRUCTOR VACÍO
    // ========================================================================

    public User() {
    }


    // ========================================================================
    // GETTERS Y SETTERS
    // ========================================================================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }
}