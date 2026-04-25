package com.example.HotelBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelResponseDTO {
    private Long id;
    private String name;
    private String location;
    private String address;
    private double rating;
    private String imageUrl;
    private Double basePrice;
    private LocalDate createdAt;
}
