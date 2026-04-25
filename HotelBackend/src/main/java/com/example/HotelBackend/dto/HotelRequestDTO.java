package com.example.HotelBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequestDTO {
    private String name;
    private String location;
    private String address;
    private double rating;
    private String imageUrl;
    private Double basePrice;
}
