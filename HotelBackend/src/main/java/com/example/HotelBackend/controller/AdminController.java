package com.example.HotelBackend.controller;

import com.example.HotelBackend.dto.*;
import com.example.HotelBackend.enums.PaymentStatus;
import com.example.HotelBackend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final HotelService hotelService;
    private final RoomService roomService;
    private final UserService userService;
    private final PaymentService paymentService;

    // Hotel Management
    @PostMapping("/hotels")
    public ResponseEntity<HotelResponseDTO> createHotel(@RequestBody HotelRequestDTO hotelRequestDTO) {
        return new ResponseEntity<>(hotelService.createHotel(hotelRequestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<HotelResponseDTO> updateHotel(@PathVariable Long id, @RequestBody HotelRequestDTO hotelRequestDTO) {
        return ResponseEntity.ok(hotelService.updateHotel(id, hotelRequestDTO));
    }

    @DeleteMapping("/hotels/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }

    // Room Management
    @PostMapping("/rooms")
    public ResponseEntity<RoomResponseDTO> addRoom(@RequestBody RoomRequestDTO roomRequestDTO) {
        return new ResponseEntity<>(roomService.addRoom(roomRequestDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    // User Management
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Payment Management
    @GetMapping("/payments")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PatchMapping("/payments/{id}/status")
    public ResponseEntity<PaymentResponseDTO> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam PaymentStatus status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(id, status));
    }
}
