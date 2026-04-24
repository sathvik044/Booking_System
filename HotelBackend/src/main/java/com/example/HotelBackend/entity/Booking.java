package com.example.HotelBackend.entity;

<<<<<<< HEAD
<<<<<<< HEAD
=======
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
>>>>>>> 2db726c1fd84c136aff8d141df3966133d67a32d
=======
>>>>>>> a535ad0c05226f1e3b17e9caa9ca6160568a947e
import java.time.LocalDate;

import com.example.HotelBackend.enums.BookingStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="bookings")
@Entity
@Builder
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
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfGuests;
    private double totalPrice;
    private BookingStatus status;
    private LocalDate createdAt;
    private LocalDate updatedAt;

}
