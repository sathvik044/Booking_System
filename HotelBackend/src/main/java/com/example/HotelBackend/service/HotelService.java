package com.example.HotelBackend.service;

import com.example.HotelBackend.dto.HotelRequestDTO;
import com.example.HotelBackend.dto.HotelResponseDTO;

import java.util.List;

public interface HotelService {
    HotelResponseDTO createHotel(HotelRequestDTO hotelRequestDTO);
    HotelResponseDTO getHotelById(Long id);
    List<HotelResponseDTO> getAllHotels();
    List<HotelResponseDTO> getHotelsByLocation(String location);
    List<HotelResponseDTO> searchHotels(String location, String keyword, Double minRating);
    HotelResponseDTO updateHotel(Long id, HotelRequestDTO hotelRequestDTO);
    void deleteHotel(Long id);
}
