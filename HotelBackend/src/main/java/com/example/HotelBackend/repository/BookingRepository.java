package com.example.HotelBackend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBackend.entity.Booking;
import com.example.HotelBackend.enums.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByRoomId(Long roomId);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByRoomIdAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
            Long roomId,
            LocalDate checkOutDate,
            LocalDate checkInDate
    );
}