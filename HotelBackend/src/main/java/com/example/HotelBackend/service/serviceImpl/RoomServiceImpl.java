package com.example.HotelBackend.service.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.enums.RoomType;
import com.example.HotelBackend.repository.RoomRepository;
import com.example.HotelBackend.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    @Override
    public List<Room> getRoomsByHotelAndType(Long hotelId, RoomType roomType) {
        return roomRepository.findByHotelIdAndRoomType(hotelId, roomType);
    }

    @Override
    public List<Room> getRoomsByPriceRange(Double minPrice, Double maxPrice) {
        return roomRepository.findByPricePerNightBetween(minPrice, maxPrice);
    }

    @Override
    public List<Room> searchRooms(Long hotelId, RoomType roomType, Double minPrice, Double maxPrice) {
if (hotelId != null && roomType != null && minPrice != null && maxPrice != null) {
            return roomRepository.findByHotelIdAndRoomTypeAndPricePerNightBetween(
                    hotelId, roomType, minPrice, maxPrice
            );
        }

        if (hotelId != null && roomType != null) {
            return roomRepository.findByHotelIdAndRoomType(hotelId, roomType);
        }

        if (minPrice != null && maxPrice != null) {
            return roomRepository.findByPricePerNightBetween(minPrice, maxPrice);
        }

        if (hotelId != null) {
            return roomRepository.findByHotelId(hotelId);
        }
        return roomRepository.findAll();
    }

    @Override
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }
}