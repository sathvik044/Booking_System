package com.example.HotelBackend.controller;

import com.example.HotelBackend.dto.RoomResponseDTO;
import com.example.HotelBackend.enums.RoomType;
import com.example.HotelBackend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponseDTO> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<RoomResponseDTO>> getRoomsByHotel(@PathVariable Long hotelId) {
        return ResponseEntity.ok(roomService.getRoomsByHotel(hotelId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<RoomResponseDTO>> searchRooms(
            @RequestParam(required = false) Long hotelId,
            @RequestParam(required = false) RoomType roomType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        return ResponseEntity.ok(roomService.searchRooms(hotelId, roomType, minPrice, maxPrice));
    }
}
