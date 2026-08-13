package com.opticalentesjl.backend.service.impl;

import com.opticalentesjl.backend.dto.*;
import com.opticalentesjl.backend.entity.Appointment;
import com.opticalentesjl.backend.entity.AppointmentStatus;
import com.opticalentesjl.backend.exception.ApiException;
import com.opticalentesjl.backend.repository.AppointmentRepository;
import com.opticalentesjl.backend.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class AppointmentServiceImpl implements AppointmentService {
    static final ZoneId BUSINESS_ZONE = ZoneId.of("America/Bogota");
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");
    private static final List<LocalTime> BUSINESS_SLOTS = buildSlots();

    private final AppointmentRepository repository;

    public AppointmentServiceImpl(AppointmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public AvailabilityResponse availability(LocalDate date) {
        validateDate(date);
        boolean open = date.getDayOfWeek() != DayOfWeek.SUNDAY;
        if (!open) {
            return new AvailabilityResponse(date.toString(), false, List.of());
        }

        List<LocalTime> occupied = repository
                .findByAppointmentDateAndActiveSlotTrueOrderByAppointmentTime(date)
                .stream().map(Appointment::getAppointmentTime).toList();

        List<String> available = BUSINESS_SLOTS.stream()
                .filter(time -> !occupied.contains(time))
                .filter(time -> isFuture(date, time))
                .map(time -> time.format(TIME_FORMAT))
                .toList();
        return new AvailabilityResponse(date.toString(), true, available);
    }

    @Override
    @Transactional
    public AppointmentResponse create(CreateAppointmentRequest request) {
        validateSlot(request.appointmentDate(), request.appointmentTime(), null);
        Appointment appointment = new Appointment();
        appointment.setFirstName(clean(request.firstName()));
        appointment.setLastName(clean(request.lastName()));
        appointment.setDocumentNumber(request.documentNumber().trim());
        appointment.setPhone(request.phone().trim());
        appointment.setEmail(request.email().trim().toLowerCase());
        appointment.setAppointmentDate(request.appointmentDate());
        appointment.setAppointmentTime(request.appointmentTime());
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setActiveSlot(true);
        return AppointmentResponse.from(repository.saveAndFlush(appointment));
    }

    @Override
    public List<AppointmentResponse> findAll(AppointmentStatus status) {
        return repository.findAllByOrderByAppointmentDateAscAppointmentTimeAsc().stream()
                .filter(item -> status == null || item.getStatus() == status)
                .map(AppointmentResponse::from)
                .toList();
    }

    @Override
    public AppointmentStatsResponse stats() {
        LocalDate today = LocalDate.now(BUSINESS_ZONE);
        return new AppointmentStatsResponse(
                repository.countByStatus(AppointmentStatus.PENDING),
                repository.countByAppointmentDateAndActiveSlotTrue(today),
                repository.countByAppointmentDateGreaterThanEqualAndActiveSlotTrue(today),
                repository.countByStatus(AppointmentStatus.CANCELLED)
        );
    }

    @Override
    @Transactional
    public AppointmentResponse reschedule(Long id, RescheduleAppointmentRequest request) {
        Appointment appointment = find(id);
        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new ApiException(HttpStatus.CONFLICT, "Una cita cancelada no se puede reagendar");
        }
        validateSlot(request.appointmentDate(), request.appointmentTime(), appointment);
        appointment.setAppointmentDate(request.appointmentDate());
        appointment.setAppointmentTime(request.appointmentTime());
        return AppointmentResponse.from(repository.saveAndFlush(appointment));
    }

    @Override
    @Transactional
    public AppointmentResponse cancel(Long id, CancelAppointmentRequest request) {
        Appointment appointment = find(id);
        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new ApiException(HttpStatus.CONFLICT, "La cita ya esta cancelada");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setActiveSlot(null);
        appointment.setCancellationReason(request.reason() == null ? null : clean(request.reason()));
        return AppointmentResponse.from(repository.save(appointment));
    }

    private Appointment find(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Cita no encontrada"));
    }

    private void validateSlot(LocalDate date, LocalTime time, Appointment current) {
        validateDate(date);
        if (date.getDayOfWeek() == DayOfWeek.SUNDAY || !BUSINESS_SLOTS.contains(time)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "La fecha u hora no pertenece al horario de atencion");
        }
        if (!isFuture(date, time)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Selecciona un horario futuro");
        }
        boolean unchanged = current != null
                && current.getAppointmentDate().equals(date)
                && current.getAppointmentTime().equals(time);
        if (!unchanged && repository.existsByAppointmentDateAndAppointmentTimeAndActiveSlotTrue(date, time)) {
            throw new ApiException(HttpStatus.CONFLICT, "El horario seleccionado ya no esta disponible");
        }
    }

    private void validateDate(LocalDate date) {
        if (date == null || date.isBefore(LocalDate.now(BUSINESS_ZONE))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "La fecha no puede estar en el pasado");
        }
        if (date.isAfter(LocalDate.now(BUSINESS_ZONE).plusMonths(3))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Solo se permiten citas hasta con 3 meses de anticipacion");
        }
    }

    private boolean isFuture(LocalDate date, LocalTime time) {
        return LocalDateTime.of(date, time).isAfter(LocalDateTime.now(BUSINESS_ZONE));
    }

    private static String clean(String value) {
        return value == null ? null : value.trim().replaceAll("\\s+", " ");
    }

    private static List<LocalTime> buildSlots() {
        List<LocalTime> slots = new ArrayList<>();
        addRange(slots, LocalTime.of(8, 0), LocalTime.of(12, 0));
        addRange(slots, LocalTime.of(14, 0), LocalTime.of(18, 0));
        return List.copyOf(slots);
    }

    private static void addRange(List<LocalTime> slots, LocalTime start, LocalTime end) {
        for (LocalTime time = start; time.isBefore(end); time = time.plusMinutes(30)) {
            slots.add(time);
        }
    }
}
