package com.opticalentesjl.backend.dto;

public record AppointmentStatsResponse(
        long pending,
        long today,
        long upcoming,
        long cancelled
) {
}
