package com.example.HotelBackend.service.serviceImpl;

import com.example.HotelBackend.dto.RoomRequestDTO;
import com.example.HotelBackend.dto.RoomResponseDTO;
import com.example.HotelBackend.entity.Hotel;
import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.enums.RoomType;
import com.example.HotelBackend.mapper.RoomMapper;
import com.example.HotelBackend.repository.HotelRepository;
import com.example.HotelBackend.repository.RoomRepository;
import com.example.HotelBackend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final RoomMapper roomMapper;

    @Override
    public RoomResponseDTO addRoom(RoomRequestDTO roomRequestDTO) {
        Hotel hotel = hotelRepository.findById(roomRequestDTO.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Room room = roomMapper.toEntity(roomRequestDTO, hotel);
        room.setCreatedAt(LocalDateTime.now());
        Room savedRoom = roomRepository.save(room);
        return roomMapper.toResponseDTO(savedRoom);
    }

    @Override
    public RoomResponseDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return roomMapper.toResponseDTO(room);
    }

    @Override
    public List<RoomResponseDTO> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId).stream()
                .map(roomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomResponseDTO> getRoomsByHotelAndType(Long hotelId, RoomType roomType) {
        return roomRepository.findByHotelIdAndRoomType(hotelId, roomType).stream()
                .map(roomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomResponseDTO> getRoomsByPriceRange(Double minPrice, Double maxPrice) {
        return roomRepository.findByPricePerNightBetween(minPrice, maxPrice).stream()
                .map(roomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomResponseDTO> searchRooms(Long hotelId, RoomType roomType, Double minPrice, Double maxPrice) {
        List<Room> rooms;
        if (hotelId != null && roomType != null && minPrice != null && maxPrice != null) {
            rooms = roomRepository.findByHotelIdAndRoomTypeAndPricePerNightBetween(hotelId, roomType, minPrice, maxPrice);
        } else if (hotelId != null && roomType != null) {
            rooms = roomRepository.findByHotelIdAndRoomType(hotelId, roomType);
        } else if (minPrice != null && maxPrice != null) {
            rooms = roomRepository.findByPricePerNightBetween(minPrice, maxPrice);
        } else if (hotelId != null) {
            rooms = roomRepository.findByHotelId(hotelId);
        } else {
            rooms = roomRepository.findAll();
        }

        return rooms.stream()
                .map(roomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }
        roomRepository.deleteById(id);
    }
}
