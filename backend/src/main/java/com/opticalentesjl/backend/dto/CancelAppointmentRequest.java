package com.opticalentesjl.backend.dto;

import jakarta.validation.constraints.Size;

public record CancelAppointmentRequest(
        @Size(max = 300) String reason
) {
}
