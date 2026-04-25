package com.example.HotelBackend.controller;

import com.example.HotelBackend.dto.HotelResponseDTO;
import com.example.HotelBackend.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<HotelResponseDTO>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelResponseDTO> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<HotelResponseDTO>> getHotelsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(hotelService.getHotelsByLocation(location));
    }

    @GetMapping("/search")
    public ResponseEntity<List<HotelResponseDTO>> searchHotels(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double minRating) {
        return ResponseEntity.ok(hotelService.searchHotels(location, keyword, minRating));
    }
}
