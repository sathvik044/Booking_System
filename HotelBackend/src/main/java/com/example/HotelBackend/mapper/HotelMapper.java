package com.example.HotelBackend.mapper;

import com.example.HotelBackend.dto.HotelRequestDTO;
import com.example.HotelBackend.dto.HotelResponseDTO;
import com.example.HotelBackend.entity.Hotel;
import org.springframework.stereotype.Component;

@Component
public class HotelMapper {

    public Hotel toEntity(HotelRequestDTO dto) {
        if (dto == null) return null;

        Hotel hotel = new Hotel();
        hotel.setName(dto.getName());
        hotel.setLocation(dto.getLocation());
        hotel.setAddress(dto.getAddress());
        hotel.setRating(dto.getRating());
        return hotel;
    }

    public HotelResponseDTO toResponseDTO(Hotel hotel) {
        if (hotel == null) return null;

        return HotelResponseDTO.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .location(hotel.getLocation())
                .address(hotel.getAddress())
                .rating(hotel.getRating())
                .createdAt(hotel.getCreatedAt())
                .build();
    }
}
