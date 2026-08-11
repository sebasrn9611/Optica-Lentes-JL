package com.opticalentesjl.backend.repository;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


// ============================================================================
// REPOSITORIO DE USUARIOS
// ============================================================================

/*
 * JpaRepository nos proporciona automáticamente
 * operaciones CRUD para la entidad User.
 */
public interface UserRepository
        extends JpaRepository<User, Long> {


    /*
     * Busca un usuario utilizando su correo electrónico.
     *
     * Optional permite representar que el usuario
     * puede existir o no.
     */
    Optional<User> findByEmail(String email);


    /*
     * Permite comprobar rápidamente si ya existe
     * un usuario con determinado correo.
     */
    boolean existsByEmail(String email);

}