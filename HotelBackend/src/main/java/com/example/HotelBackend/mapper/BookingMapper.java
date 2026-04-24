package com.example.HotelBackend.mapper;

import com.example.HotelBackend.dto.BookingRequestDTO;
import com.example.HotelBackend.dto.BookingResponseDTO;
import com.example.HotelBackend.entity.Booking;
import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.entity.User;

public class BookingMapper {

    public static Booking toEntity(BookingRequestDTO dto, User user, Room room) {

        return Booking.builder()
                .user(user)
                .room(room)
                .checkInDate(dto.getCheckInDate())
                .checkOutDate(dto.getCheckOutDate())
                .build();
    }


    public static BookingResponseDTO toDTO(Booking booking) {

        return BookingResponseDTO.builder()
                .bookingId(booking.getId())
                .userId(booking.getUser().getId())
                .roomId(booking.getRoom().getId())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .build();
    }
}