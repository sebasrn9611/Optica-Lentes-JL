package com.opticalentesjl.backend.config;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;


// ============================================================================
// CONFIGURACIÓN JWT
// ============================================================================

@Configuration
public class JwtConfig {

    /*
     * Leemos la clave secreta desde application.properties.
     */
    @Value("${app.jwt.secret}")
    private String jwtSecret;


    // ========================================================================
    // CLAVE SECRETA
    // ========================================================================

    /*
     * Creamos la clave que se utilizará para:
     *
     * 1. Firmar los JWT.
     * 2. Verificar los JWT recibidos.
     */
    @Bean
    public SecretKey jwtSecretKey() {

        return new SecretKeySpec(
                jwtSecret.getBytes(StandardCharsets.UTF_8),
                "HmacSHA256"
        );
    }


    // ========================================================================
    // JWT ENCODER
    // ========================================================================

    /*
     * JwtEncoder se encargará de generar los tokens.
     */
    @Bean
    public JwtEncoder jwtEncoder(
            SecretKey jwtSecretKey
    ) {

        return NimbusJwtEncoder
                .withSecretKey(jwtSecretKey)
                .algorithm(MacAlgorithm.HS256)
                .build();
    }


    // ========================================================================
    // JWT DECODER
    // ========================================================================

    /*
     * JwtDecoder comprobará que los tokens recibidos
     * tengan una firma válida.
     */
    @Bean
    public JwtDecoder jwtDecoder(
            SecretKey jwtSecretKey
    ) {

        return NimbusJwtDecoder
                .withSecretKey(jwtSecretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }
}