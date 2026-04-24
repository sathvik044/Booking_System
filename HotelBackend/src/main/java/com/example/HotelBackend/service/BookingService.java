package com.example.HotelBackend.service;

import java.util.List;

import com.example.HotelBackend.dto.BookingRequestDTO;
import com.example.HotelBackend.dto.BookingResponseDTO;

public interface BookingService {

    BookingResponseDTO createBooking(BookingRequestDTO requestDTO);

    List<BookingResponseDTO> getBookingsByUser(Long userId);
    void cancelBooking(Long bookingId);
}