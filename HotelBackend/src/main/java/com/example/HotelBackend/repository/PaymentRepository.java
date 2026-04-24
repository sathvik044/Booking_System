package com.example.HotelBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBackend.entity.Payment;
import com.example.HotelBackend.enums.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBookingId(Long bookingId);
   Optional<Payment> findByTransactionId(String transactionId);
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
}