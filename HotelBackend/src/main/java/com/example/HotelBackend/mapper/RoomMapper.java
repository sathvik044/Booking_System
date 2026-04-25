package com.example.HotelBackend.mapper;

import com.example.HotelBackend.dto.RoomRequestDTO;
import com.example.HotelBackend.dto.RoomResponseDTO;
import com.example.HotelBackend.entity.Hotel;
import com.example.HotelBackend.entity.Room;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {

    public Room toEntity(RoomRequestDTO dto, Hotel hotel) {
        if (dto == null) return null;

        Room room = new Room();
        room.setHotel(hotel);
        room.setRoomType(dto.getRoomType());
        room.setPricePerNight(dto.getPricePerNight());
        room.setTotalRooms(dto.getTotalRooms());
        return room;
    }

    public RoomResponseDTO toResponseDTO(Room room) {
        if (room == null) return null;

        return RoomResponseDTO.builder()
                .id(room.getId())
                .hotelId(room.getHotel().getId())
                .hotelName(room.getHotel().getName())
                .roomType(room.getRoomType())
                .pricePerNight(room.getPricePerNight())
                .totalRooms(room.getTotalRooms())
                .createdAt(room.getCreatedAt())
                .build();
    }
}
