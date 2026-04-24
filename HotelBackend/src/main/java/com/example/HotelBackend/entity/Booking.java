package com.example.HotelBackend.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import com.example.HotelBackend.enums.BookingStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="bookings")
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    private User user;
    @ManyToOne
    @JoinColumn(name="room_id", nullable=false)
    private Room room;
    private LocalDate checkinDate;
    private LocalDate checkoutDate;
    private int numberOfGuests;
    private double totalPrice;
    private BookingStatus status;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    
}
