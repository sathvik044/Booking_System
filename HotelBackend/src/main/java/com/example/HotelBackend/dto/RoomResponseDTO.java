package com.example.HotelBackend.dto;

import com.example.HotelBackend.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDTO {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private RoomType roomType;
    private Double pricePerNight;
    private Integer totalRooms;
    private LocalDateTime createdAt;
}
