package com.example.HotelBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBackend.entity.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByLocation(String location);
    List<Hotel> findByNameContainingIgnoreCase(String keyword);
    List<Hotel> findByLocationAndNameContainingIgnoreCase(
            String location,
            String keyword
    );
    List<Hotel> findByRatingGreaterThanEqual(Double rating);
    List<Hotel> findByLocationAndRatingGreaterThanEqual(
            String location,
            Double rating
    );
}