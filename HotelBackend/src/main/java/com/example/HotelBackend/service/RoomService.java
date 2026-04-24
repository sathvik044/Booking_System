package com.example.HotelBackend.service;

import java.util.List;

import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.enums.RoomType;

public interface RoomService {

    List<Room> getRoomsByHotel(Long hotelId);
    List<Room> getRoomsByHotelAndType(Long hotelId, RoomType roomType);
List<Room> getRoomsByPriceRange(Double minPrice, Double maxPrice);
    List<Room> searchRooms(Long hotelId, RoomType roomType, Double minPrice, Double maxPrice);

    Room addRoom(Room room);
}