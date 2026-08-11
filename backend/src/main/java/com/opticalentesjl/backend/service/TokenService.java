package com.opticalentesjl.backend.service;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import com.opticalentesjl.backend.entity.User;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;

import org.springframework.stereotype.Service;

import java.time.Instant;


// ============================================================================
// SERVICIO DE TOKENS JWT
// ============================================================================

@Service
public class TokenService {

    // Encoder encargado de generar el JWT.
    private final JwtEncoder jwtEncoder;


    /*
     * Duración configurada en application.properties.
     */
    @Value("${app.jwt.expiration}")
    private long expirationSeconds;


    // ========================================================================
    // CONSTRUCTOR
    // ========================================================================

    public TokenService(
            JwtEncoder jwtEncoder
    ) {

        this.jwtEncoder = jwtEncoder;
    }


    // ========================================================================
    // GENERAR TOKEN
    // ========================================================================

    public String generateToken(User user) {

        // Momento actual.
        Instant now = Instant.now();


        /*
         * Definimos la información que viajará
         * dentro del JWT.
         */
        JwtClaimsSet claims =
                JwtClaimsSet.builder()

                        // Aplicación que genera el token.
                        .issuer("optica-lentes-jl")

                        // Fecha de creación.
                        .issuedAt(now)

                        // Fecha de vencimiento.
                        .expiresAt(
                                now.plusSeconds(
                                        expirationSeconds
                                )
                        )

                        // Usuario propietario del token.
                        .subject(user.getEmail())

                        // Nombre.
                        .claim(
                                "name",
                                user.getName()
                        )

                        // Rol.
                        .claim(
                                "role",
                                user.getRole()
                        )

                        .build();


        /*
         * Indicamos el algoritmo utilizado:
         * HS256.
         */
        JwsHeader header =
                JwsHeader
                        .with(MacAlgorithm.HS256)
                        .build();


        /*
         * Generamos el JWT y devolvemos
         * únicamente su representación de texto.
         */
        return jwtEncoder
                .encode(
                        JwtEncoderParameters.from(
                                header,
                                claims
                        )
                )
                .getTokenValue();
    }
}