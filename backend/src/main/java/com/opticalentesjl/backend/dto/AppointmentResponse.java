package com.opticalentesjl.backend.dto;

import com.opticalentesjl.backend.entity.Appointment;
import com.opticalentesjl.backend.entity.AppointmentStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record AppointmentResponse(
        Long id,
        String firstName,
        String lastName,
        String documentNumber,
        String phone,
        String email,
        String appointmentDate,
        String appointmentTime,
        AppointmentStatus status,
        String cancellationReason,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");

    public static AppointmentResponse from(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getFirstName(),
                appointment.getLastName(),
                appointment.getDocumentNumber(),
                appointment.getPhone(),
                appointment.getEmail(),
                appointment.getAppointmentDate().toString(),
                appointment.getAppointmentTime().format(TIME_FORMAT),
                appointment.getStatus(),
                appointment.getCancellationReason(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}
