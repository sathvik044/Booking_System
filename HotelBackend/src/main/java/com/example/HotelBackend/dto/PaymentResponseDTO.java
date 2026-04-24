package com.example.HotelBackend.dto;

import java.time.LocalDateTime;

import com.example.HotelBackend.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {

    private Long paymentId;

    private Long bookingId;

    private Double amount;

    private String paymentMethod;

    private String transactionId;

    private PaymentStatus paymentStatus;

    private LocalDateTime createdAt;
}