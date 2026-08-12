package com.opticalentesjl.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


// ============================================================================
// CONFIGURACIÓN GLOBAL DE CORS
// ============================================================================

@Configuration
public class CorsConfig {

    /*
     * Dirección del frontend permitida.
     *
     * En desarrollo:
     * http://localhost:5173
     *
     * En producción vendrá desde FRONTEND_URL.
     */
    @Value("${app.cors.allowed-origin}")
    private String allowedOrigin;


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // ================================================================
        // ORIGEN PERMITIDO
        // ================================================================

        configuration.setAllowedOrigins(
                List.of(allowedOrigin)
        );


        // ================================================================
        // MÉTODOS PERMITIDOS
        // ================================================================

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        // ================================================================
        // HEADERS PERMITIDOS
        // ================================================================

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept"
                )
        );


        // ================================================================
        // HEADERS QUE PUEDE LEER EL FRONTEND
        // ================================================================

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );


        /*
         * Actualmente usamos JWT en Authorization y no cookies de sesión.
         * Por eso no necesitamos credentials=true.
         */
        configuration.setAllowCredentials(false);


        // ================================================================
        // REGISTRAR CORS PARA TODA LA API
        // ================================================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/api/**",
                configuration
        );

        return source;
    }
}