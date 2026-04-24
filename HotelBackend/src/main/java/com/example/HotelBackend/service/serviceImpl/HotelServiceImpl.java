package com.example.HotelBackend.service.serviceImpl;

import com.example.HotelBackend.dto.HotelRequestDTO;
import com.example.HotelBackend.dto.HotelResponseDTO;
import com.example.HotelBackend.entity.Hotel;
import com.example.HotelBackend.mapper.HotelMapper;
import com.example.HotelBackend.repository.HotelRepository;
import com.example.HotelBackend.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    @Override
    public HotelResponseDTO createHotel(HotelRequestDTO hotelRequestDTO) {
        Hotel hotel = hotelMapper.toEntity(hotelRequestDTO);
        hotel.setCreatedAt(LocalDate.now());
        hotel.setUpdatedAt(LocalDate.now());
        Hotel savedHotel = hotelRepository.save(hotel);
        return hotelMapper.toResponseDTO(savedHotel);
    }

    @Override
    public HotelResponseDTO getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return hotelMapper.toResponseDTO(hotel);
    }

    @Override
    public List<HotelResponseDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(hotelMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HotelResponseDTO> getHotelsByLocation(String location) {
        return hotelRepository.findByLocation(location).stream()
                .map(hotelMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HotelResponseDTO> searchHotels(String location, String keyword, Double minRating) {
        List<Hotel> hotels;
        
        if (location != null && keyword != null) {
            hotels = hotelRepository.findByLocationAndNameContainingIgnoreCase(location, keyword);
        } else if (location != null && minRating != null) {
            hotels = hotelRepository.findByLocationAndRatingGreaterThanEqual(location, minRating);
        } else if (location != null) {
            hotels = hotelRepository.findByLocation(location);
        } else if (keyword != null) {
            hotels = hotelRepository.findByNameContainingIgnoreCase(keyword);
        } else if (minRating != null) {
            hotels = hotelRepository.findByRatingGreaterThanEqual(minRating);
        } else {
            hotels = hotelRepository.findAll();
        }

        return hotels.stream()
                .map(hotelMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HotelResponseDTO updateHotel(Long id, HotelRequestDTO hotelRequestDTO) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        hotel.setName(hotelRequestDTO.getName());
        hotel.setLocation(hotelRequestDTO.getLocation());
        hotel.setAddress(hotelRequestDTO.getAddress());
        hotel.setRating(hotelRequestDTO.getRating());
        hotel.setUpdatedAt(LocalDate.now());

        Hotel updatedHotel = hotelRepository.save(hotel);
        return hotelMapper.toResponseDTO(updatedHotel);
    }

    @Override
    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException("Hotel not found");
        }
        hotelRepository.deleteById(id);
    }
}
