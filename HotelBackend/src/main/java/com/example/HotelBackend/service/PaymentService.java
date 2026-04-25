package com.example.HotelBackend.service;

import com.example.HotelBackend.dto.PaymentRequestDTO;
import com.example.HotelBackend.dto.PaymentResponseDTO;
import com.example.HotelBackend.enums.PaymentStatus;

import java.util.List;

public interface PaymentService {
    PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO);
    PaymentResponseDTO getPaymentById(Long id);
    PaymentResponseDTO getPaymentByBookingId(Long bookingId);
    PaymentResponseDTO updatePaymentStatus(Long id, PaymentStatus status);
    List<PaymentResponseDTO> getAllPayments();
}
