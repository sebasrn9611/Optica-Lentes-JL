package com.opticalentesjl.backend;

// ============================================================================
// IMPORTACIONES
// ============================================================================

// GetMapping permite atender solicitudes HTTP de tipo GET.
import org.springframework.web.bind.annotation.GetMapping;

// RequestMapping define una ruta principal para todo el controlador.
import org.springframework.web.bind.annotation.RequestMapping;

// RestController indica que esta clase será un controlador de una API REST.
import org.springframework.web.bind.annotation.RestController;


// ============================================================================
// CONTROLADOR REST
// ============================================================================

    /*
    * @RestController registra esta clase dentro de Spring Boot.
     *
    * Los métodos de esta clase devolverán directamente información
    * al navegador, React o Postman.
    */

   @RestController

    /*
    * Todas las rutas de este controlador comenzarán con:
     *
     * /api
        */

    @RequestMapping("/api")
    public class PruebaController {

    /*
     * @GetMapping indica que este metodo responde a una peticion Get.
     *
     * La dirección completa será:
     *
     * http://localhost:8080/api/prueba
     */

    @GetMapping("/prueba")
    public String probarBackend() {

        /*
         * Este texto será enviado como respuesta al navegador.
         */
        return "Backend de Óptica Lentes J.L. funcionando correctamente.";
    }
}
