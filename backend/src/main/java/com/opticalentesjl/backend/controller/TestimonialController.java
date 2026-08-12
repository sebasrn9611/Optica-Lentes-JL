package com.opticalentesjl.backend.controller;

import com.opticalentesjl.backend.entity.Testimonial;
import com.opticalentesjl.backend.service.TestimonialService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<Testimonial>> findAll() {
        return ResponseEntity.ok(testimonialService.findAll());
    }

    @PostMapping
    public ResponseEntity<Testimonial> save(@Valid @RequestBody Testimonial testimonial) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(testimonialService.save(testimonial));
    }
}
