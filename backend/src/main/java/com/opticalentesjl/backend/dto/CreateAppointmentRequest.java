package com.opticalentesjl.backend.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateAppointmentRequest(
        @NotBlank @Size(max = 80) @Pattern(regexp = "^[\\p{L} .'-]+$", message = "El nombre contiene caracteres no validos")
        String firstName,

        @NotBlank @Size(max = 80) @Pattern(regexp = "^[\\p{L} .'-]+$", message = "El apellido contiene caracteres no validos")
        String lastName,

        @NotBlank @Pattern(regexp = "^[0-9]{6,10}$", message = "La cedula debe tener entre 6 y 10 digitos")
        String documentNumber,

        @NotBlank @Pattern(regexp = "^[0-9]{10}$", message = "El celular debe tener 10 digitos")
        String phone,

        @NotBlank @Email @Size(max = 160)
        String email,

        @NotNull @FutureOrPresent
        LocalDate appointmentDate,

        @NotNull
        LocalTime appointmentTime
) {
}
