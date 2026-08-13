package com.opticalentesjl.backend.service.impl;

import com.opticalentesjl.backend.dto.CancelAppointmentRequest;
import com.opticalentesjl.backend.dto.CreateAppointmentRequest;
import com.opticalentesjl.backend.dto.RescheduleAppointmentRequest;
import com.opticalentesjl.backend.entity.Appointment;
import com.opticalentesjl.backend.entity.AppointmentStatus;
import com.opticalentesjl.backend.exception.ApiException;
import com.opticalentesjl.backend.repository.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceImplTest {
    @Mock
    private AppointmentRepository repository;
    private AppointmentServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new AppointmentServiceImpl(repository);
    }

    @Test
    void availabilityExcludesAlreadyReservedSlot() {
        LocalDate date = nextBusinessDay();
        Appointment occupied = activeAppointment(date, LocalTime.of(9, 0));
        when(repository.findByAppointmentDateAndActiveSlotTrueOrderByAppointmentTime(date)).thenReturn(List.of(occupied));

        var result = service.availability(date);

        assertTrue(result.open());
        assertFalse(result.availableTimes().contains("09:00"));
        assertTrue(result.availableTimes().contains("09:30"));
    }

    @Test
    void createRejectsAnOccupiedSlot() {
        LocalDate date = nextBusinessDay();
        LocalTime time = LocalTime.of(10, 0);
        when(repository.existsByAppointmentDateAndAppointmentTimeAndActiveSlotTrue(date, time)).thenReturn(true);
        var request = new CreateAppointmentRequest("Ana", "Perez", "123456789", "3001234567", "ana@example.com", date, time);

        ApiException exception = assertThrows(ApiException.class, () -> service.create(request));

        assertEquals(409, exception.getStatus().value());
        verify(repository, never()).saveAndFlush(any());
    }

    @Test
    void cancellationKeepsHistoryAndReleasesSlot() {
        Appointment appointment = activeAppointment(nextBusinessDay(), LocalTime.of(10, 30));
        when(repository.findById(8L)).thenReturn(Optional.of(appointment));
        when(repository.save(any(Appointment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var result = service.cancel(8L, new CancelAppointmentRequest("Solicitud del paciente"));

        assertEquals(AppointmentStatus.CANCELLED, result.status());
        assertNull(appointment.getActiveSlot());
        assertEquals("Solicitud del paciente", appointment.getCancellationReason());
    }

    @Test
    void cancelledAppointmentCannotBeRescheduled() {
        Appointment appointment = activeAppointment(nextBusinessDay(), LocalTime.of(11, 0));
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setActiveSlot(null);
        when(repository.findById(3L)).thenReturn(Optional.of(appointment));
        var request = new RescheduleAppointmentRequest(nextBusinessDay().plusDays(1), LocalTime.of(11, 30));

        ApiException exception = assertThrows(ApiException.class, () -> service.reschedule(3L, request));

        assertEquals(409, exception.getStatus().value());
    }

    private static Appointment activeAppointment(LocalDate date, LocalTime time) {
        Appointment appointment = new Appointment();
        appointment.setFirstName("Paciente");
        appointment.setLastName("Prueba");
        appointment.setDocumentNumber("123456789");
        appointment.setPhone("3001234567");
        appointment.setEmail("paciente@example.com");
        appointment.setAppointmentDate(date);
        appointment.setAppointmentTime(time);
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setActiveSlot(true);
        return appointment;
    }

    private static LocalDate nextBusinessDay() {
        LocalDate date = LocalDate.now(AppointmentServiceImpl.BUSINESS_ZONE).plusDays(1);
        while (date.getDayOfWeek() == DayOfWeek.SUNDAY) date = date.plusDays(1);
        return date;
    }
}
