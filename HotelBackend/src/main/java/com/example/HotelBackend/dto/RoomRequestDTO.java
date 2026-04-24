package com.example.HotelBackend.dto;

import com.example.HotelBackend.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDTO {
    private Long hotelId;
    private RoomType roomType;
    private Double pricePerNight;
    private Integer totalRooms;
}
