package com.opticalentesjl.backend.dto;

import java.util.List;

public record AvailabilityResponse(
        String date,
        boolean open,
        List<String> availableTimes
) {
}
