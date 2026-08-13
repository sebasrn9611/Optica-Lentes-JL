package com.opticalentesjl.backend.service;

import com.opticalentesjl.backend.dto.*;
import com.opticalentesjl.backend.entity.AppointmentStatus;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    AvailabilityResponse availability(LocalDate date);
    AppointmentResponse create(CreateAppointmentRequest request);
    List<AppointmentResponse> findAll(AppointmentStatus status);
    AppointmentStatsResponse stats();
    AppointmentResponse reschedule(Long id, RescheduleAppointmentRequest request);
    AppointmentResponse cancel(Long id, CancelAppointmentRequest request);
}
