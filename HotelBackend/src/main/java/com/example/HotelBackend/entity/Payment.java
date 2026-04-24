package com.example.HotelBackend.entity;
   
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import com.example.HotelBackend.enums.PaymentStatus;

@Entity
@Table(name = "payments")
@Data   
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;

    @Column(name = "payment_method")
    private String paymentMethod; 

    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}

