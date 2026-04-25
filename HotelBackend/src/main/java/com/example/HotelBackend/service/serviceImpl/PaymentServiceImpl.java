package com.example.HotelBackend.service.serviceImpl;

import com.example.HotelBackend.dto.PaymentRequestDTO;
import com.example.HotelBackend.dto.PaymentResponseDTO;
import com.example.HotelBackend.entity.Booking;
import com.example.HotelBackend.entity.Payment;
import com.example.HotelBackend.enums.BookingStatus;
import com.example.HotelBackend.enums.PaymentStatus;
import com.example.HotelBackend.mapper.PaymentMapper;
import com.example.HotelBackend.repository.BookingRepository;
import com.example.HotelBackend.repository.PaymentRepository;
import com.example.HotelBackend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentMapper paymentMapper;

    @Override
    @Transactional
    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO) {
        Booking booking = bookingRepository.findById(paymentRequestDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Check if payment already exists for this booking
        paymentRepository.findByBookingId(booking.getId()).ifPresent(p -> {
            throw new RuntimeException("Payment already exists for this booking");
        });

        Payment payment = paymentMapper.toEntity(paymentRequestDTO, booking);
        // Simulate payment processing (assuming SUCCESS for now)
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        
        Payment savedPayment = paymentRepository.save(payment);

        // Update booking status on successful payment
        if (savedPayment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            booking.setStatus(BookingStatus.CONFIRMED);
            bookingRepository.save(booking);
        }

        return paymentMapper.toDTO(savedPayment);
    }

    @Override
    public PaymentResponseDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return paymentMapper.toDTO(payment);
    }

    @Override
    public PaymentResponseDTO getPaymentByBookingId(Long bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found for booking ID: " + bookingId));
        return paymentMapper.toDTO(payment);
    }

    @Override
    @Transactional
    public PaymentResponseDTO updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setPaymentStatus(status);
        Payment updatedPayment = paymentRepository.save(payment);

        if (status == PaymentStatus.SUCCESS) {
            Booking booking = payment.getBooking();
            booking.setStatus(BookingStatus.CONFIRMED);
            bookingRepository.save(booking);
        } else if (status == PaymentStatus.FAILED) {
            Booking booking = payment.getBooking();
            booking.setStatus(BookingStatus.CANCELED);
            bookingRepository.save(booking);
        }

        return paymentMapper.toDTO(updatedPayment);
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toDTO)
                .collect(Collectors.toList());
    }
}
