package com.example.HotelBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.enums.RoomType;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    List<Room> findByHotelIdAndRoomType(Long hotelId, RoomType roomType);
    List<Room> findByPricePerNightBetween(Double minPrice, Double maxPrice);

    List<Room> findByHotelIdAndRoomTypeAndPricePerNightBetween(
            Long hotelId,
            RoomType roomType,
            Double minPrice,
            Double maxPrice
    );
}