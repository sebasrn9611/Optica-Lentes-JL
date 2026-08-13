package com.opticalentesjl.backend.repository;

import com.opticalentesjl.backend.entity.Appointment;
import com.opticalentesjl.backend.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByAppointmentDateAndAppointmentTimeAndActiveSlotTrue(LocalDate date, LocalTime time);

    List<Appointment> findByAppointmentDateAndActiveSlotTrueOrderByAppointmentTime(LocalDate date);

    List<Appointment> findAllByOrderByAppointmentDateAscAppointmentTimeAsc();

    long countByStatus(AppointmentStatus status);

    long countByAppointmentDateAndActiveSlotTrue(LocalDate date);

    long countByAppointmentDateGreaterThanEqualAndActiveSlotTrue(LocalDate date);
}
