package com.example.HotelBackend.controller;

import com.example.HotelBackend.dto.PaymentRequestDTO;
import com.example.HotelBackend.dto.PaymentResponseDTO;
import com.example.HotelBackend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
        return new ResponseEntity<>(paymentService.processPayment(paymentRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentResponseDTO> getPaymentByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(paymentService.getPaymentByBookingId(bookingId));
    }
}
