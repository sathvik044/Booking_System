package com.example.HotelBackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBackend.dto.HotelRequestDTO;
import com.example.HotelBackend.dto.HotelResponseDTO;
import com.example.HotelBackend.service.HotelService;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping
    public HotelResponseDTO createHotel(@RequestBody HotelRequestDTO hotelRequestDTO) {
        return hotelService.createHotel(hotelRequestDTO);
    }

    @GetMapping("/{id}")
    public HotelResponseDTO getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    @GetMapping
    public List<HotelResponseDTO> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/location/{location}")
    public List<HotelResponseDTO> getHotelsByLocation(@PathVariable String location) {
        return hotelService.getHotelsByLocation(location);
    }

    @GetMapping("/search")
    public List<HotelResponseDTO> searchHotels(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double minRating) {
        return hotelService.searchHotels(location, keyword, minRating);
    }

    @PutMapping("/{id}")
    public HotelResponseDTO updateHotel(@PathVariable Long id, @RequestBody HotelRequestDTO hotelRequestDTO) {
        return hotelService.updateHotel(id, hotelRequestDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return "Hotel deleted successfully";
    }
}