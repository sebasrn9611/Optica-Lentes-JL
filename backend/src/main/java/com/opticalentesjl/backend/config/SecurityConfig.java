package com.opticalentesjl.backend.config;

// ============================================================================
// IMPORTACIONES
// ============================================================================

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import org.springframework.security.web.SecurityFilterChain;


// ============================================================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================================================

@Configuration
public class SecurityConfig {


    // ========================================================================
    // PASSWORD ENCODER
    // ========================================================================

    /*
     * BCrypt permite almacenar y comparar
     * contraseñas de forma segura.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // ========================================================================
    // CONVERTIR EL ROL DEL JWT
    // ========================================================================

    /*
     * Nuestro JWT contiene un claim:
     *
     * "role": "ADMIN"
     *
     * Spring Security trabajará con:
     *
     * ROLE_ADMIN
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();


        // Indicamos dónde está almacenado el rol.
        authoritiesConverter.setAuthoritiesClaimName("role");


        /*
         * Convierte:
         *
         * ADMIN
         *
         * en:
         *
         * ROLE_ADMIN
         */
        authoritiesConverter.setAuthorityPrefix("ROLE_");


        JwtAuthenticationConverter authenticationConverter =
                new JwtAuthenticationConverter();


        authenticationConverter.setJwtGrantedAuthoritiesConverter(
                authoritiesConverter
        );


        return authenticationConverter;
    }


    // ========================================================================
    // FILTRO DE SEGURIDAD
    // ========================================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationConverter jwtAuthenticationConverter
    ) throws Exception {

        http

                // ============================================================
                // CORS
                // ============================================================

                /*
                 * Permitimos que Spring Security utilice
                 * la configuración CORS de la aplicación.
                 */
                .cors(Customizer.withDefaults())


                // ============================================================
                // CSRF
                // ============================================================

                /*
                 * Nuestra aplicación funciona como API REST
                 * utilizando JWT.
                 */
                .csrf(csrf ->
                        csrf.disable()
                )


                // ============================================================
                // SESIONES
                // ============================================================

                /*
                 * El servidor no guardará una sesión tradicional.
                 *
                 * Cada petición protegida deberá incluir
                 * el JWT.
                 */
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // ============================================================
                // AUTORIZACIÓN
                // ============================================================

                .authorizeHttpRequests(auth -> auth


                        // ----------------------------------------------------
                        // LOGIN
                        // ----------------------------------------------------

                        /*
                         * El login debe ser público.
                         *
                         * Si lo protegemos, nadie podría
                         * obtener el primer token.
                         */
                        .requestMatchers(
                                "/api/auth/login"
                        )
                        .permitAll()


                        // ----------------------------------------------------
                        // CATÁLOGO PÚBLICO
                        // ----------------------------------------------------

                        /*
                         * Cualquier visitante puede consultar productos.
                         */
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/**",
                                "/api/testimonials/**",
                                "/api/appointments/availability"
                        )
                        .permitAll()

                        // Cualquier visitante puede crear una cita.
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/appointments"
                        )
                        .permitAll()

                        // Los visitantes pueden publicar su experiencia.
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/testimonials/**"
                        )
                        .permitAll()


                        // ----------------------------------------------------
                        // CREAR PRODUCTOS
                        // ----------------------------------------------------

                        /*
                         * Solamente ADMIN puede crear productos.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products/**"
                        )
                        .hasRole("ADMIN")


                        // ----------------------------------------------------
                        // ACTUALIZAR PRODUCTOS
                        // ----------------------------------------------------

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/**"
                        )
                        .hasRole("ADMIN")


                        // ----------------------------------------------------
                        // ELIMINAR PRODUCTOS
                        // ----------------------------------------------------

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/**"
                        )
                        .hasRole("ADMIN")


                        // ----------------------------------------------------
                        // RESTO DEL SISTEMA
                        // ----------------------------------------------------

                        /*
                         * Cualquier otro endpoint requiere
                         * como mínimo estar autenticado.
                         */
                        .anyRequest()
                        .authenticated()
                )


                // ============================================================
                // JWT RESOURCE SERVER
                // ============================================================

                /*
                 * Spring Security buscará:
                 *
                 * Authorization: Bearer TOKEN
                 *
                 * y validará el JWT utilizando JwtDecoder.
                 */
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter
                                )
                        )
                );


        return http.build();
    }
}
