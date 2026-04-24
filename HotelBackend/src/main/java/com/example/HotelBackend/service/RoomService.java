package com.example.HotelBackend.service;

import com.example.HotelBackend.dto.RoomRequestDTO;
import com.example.HotelBackend.dto.RoomResponseDTO;
import com.example.HotelBackend.enums.RoomType;

import java.util.List;

public interface RoomService {
    RoomResponseDTO addRoom(RoomRequestDTO roomRequestDTO);
    RoomResponseDTO getRoomById(Long id);
    List<RoomResponseDTO> getRoomsByHotel(Long hotelId);
    List<RoomResponseDTO> getRoomsByHotelAndType(Long hotelId, RoomType roomType);
    List<RoomResponseDTO> getRoomsByPriceRange(Double minPrice, Double maxPrice);
    List<RoomResponseDTO> searchRooms(Long hotelId, RoomType roomType, Double minPrice, Double maxPrice);
    void deleteRoom(Long id);
}
