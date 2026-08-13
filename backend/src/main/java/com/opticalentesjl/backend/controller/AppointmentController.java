package com.opticalentesjl.backend.controller;

import com.opticalentesjl.backend.dto.*;
import com.opticalentesjl.backend.entity.AppointmentStatus;
import com.opticalentesjl.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping("/availability")
    public AvailabilityResponse availability(@RequestParam LocalDate date) {
        return service.availability(date);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(@Valid @RequestBody CreateAppointmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public List<AppointmentResponse> findAll(@RequestParam(required = false) AppointmentStatus status) {
        return service.findAll(status);
    }

    @GetMapping("/stats")
    public AppointmentStatsResponse stats() {
        return service.stats();
    }

    @PutMapping("/{id}/reschedule")
    public AppointmentResponse reschedule(
            @PathVariable Long id,
            @Valid @RequestBody RescheduleAppointmentRequest request
    ) {
        return service.reschedule(id, request);
    }

    @PutMapping("/{id}/cancel")
    public AppointmentResponse cancel(
            @PathVariable Long id,
            @Valid @RequestBody CancelAppointmentRequest request
    ) {
        return service.cancel(id, request);
    }
}
