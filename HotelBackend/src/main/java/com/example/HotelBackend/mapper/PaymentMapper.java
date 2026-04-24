package com.example.HotelBackend.mapper;

import java.util.UUID;

import com.example.HotelBackend.dto.PaymentRequestDTO;
import com.example.HotelBackend.dto.PaymentResponseDTO;
import com.example.HotelBackend.entity.Booking;
import com.example.HotelBackend.entity.Payment;
import com.example.HotelBackend.enums.PaymentStatus;

import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payment toEntity(PaymentRequestDTO dto, Booking booking) {

        return Payment.builder()
                .booking(booking)
                .amount(dto.getAmount())
                .paymentMethod(dto.getPaymentMethod())
                .paymentStatus(PaymentStatus.PENDING) // default at creation
                .transactionId(generateTransactionId())
                .build();
    }

    public PaymentResponseDTO toDTO(Payment payment) {

        return PaymentResponseDTO.builder()
                .paymentId(payment.getId())
                .bookingId(payment.getBooking().getId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .transactionId(payment.getTransactionId())
                .paymentStatus(payment.getPaymentStatus())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    private static String generateTransactionId() {
        return "TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
    }
}