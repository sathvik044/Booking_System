package com.example.HotelBackend.service.serviceImpl;

import com.example.HotelBackend.dto.BookingRequestDTO;
import com.example.HotelBackend.dto.BookingResponseDTO;
import com.example.HotelBackend.entity.Booking;
import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.entity.User;
import com.example.HotelBackend.enums.BookingStatus;
import com.example.HotelBackend.mapper.BookingMapper;
import com.example.HotelBackend.repository.BookingRepository;
import com.example.HotelBackend.repository.RoomRepository;
import com.example.HotelBackend.repository.UserRepository;
import com.example.HotelBackend.service.BookingService;

import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              UserRepository userRepository,
                              RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    // 🔥 MAIN LOGIC
    @Override
    public BookingResponseDTO createBooking(BookingRequestDTO dto) {

        // 1. Fetch User
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Fetch Room
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // 3. Validate Dates
        if (dto.getCheckInDate().isAfter(dto.getCheckOutDate())) {
            throw new RuntimeException("Invalid date range");
        }

        // 4. 🔥 Check Availability (prevent double booking)
        List<Booking> existingBookings =
                bookingRepository.findByRoomIdAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
                        dto.getRoomId(),
                        dto.getCheckOutDate(),
                        dto.getCheckInDate()
                );

        if (!existingBookings.isEmpty()) {
            throw new RuntimeException("Room not available for selected dates");
        }

        // 5. Calculate total price
        long days = ChronoUnit.DAYS.between(dto.getCheckInDate(), dto.getCheckOutDate());
        double totalPrice = days * room.getPricePerNight();

        // 6. Convert DTO → Entity
        Booking booking = BookingMapper.toEntity(dto, user, room);
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.CONFIRMED);

        // 7. Save
        bookingRepository.save(booking);

        // 8. Convert Entity → DTO
        return BookingMapper.toDTO(booking);
    }

    @Override
    public List<BookingResponseDTO> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId)
                .stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);
    }
}