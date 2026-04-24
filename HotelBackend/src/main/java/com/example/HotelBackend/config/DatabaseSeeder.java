package com.example.HotelBackend.config;

import com.example.HotelBackend.entity.Hotel;
import com.example.HotelBackend.entity.Room;
import com.example.HotelBackend.entity.User;
import com.example.HotelBackend.enums.RoomType;
import com.example.HotelBackend.enums.UserRole;
import com.example.HotelBackend.repository.HotelRepository;
import com.example.HotelBackend.repository.RoomRepository;
import com.example.HotelBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if no hotels exist
        if (hotelRepository.count() == 0) {
            System.out.println("Seeding initial data...");

            // 1. Seed Users
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@luxestay.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("1234567890");
            admin.setRole(UserRole.ADMIN);
            admin.setCreatedAt(LocalDate.now());
            admin.setUpdatedAt(LocalDate.now());
            userRepository.save(admin);

            User standardUser = new User();
            standardUser.setName("Test User");
            standardUser.setEmail("user@luxestay.com");
            standardUser.setPassword(passwordEncoder.encode("user123"));
            standardUser.setPhone("0987654321");
            standardUser.setRole(UserRole.USER);
            standardUser.setCreatedAt(LocalDate.now());
            standardUser.setUpdatedAt(LocalDate.now());
            userRepository.save(standardUser);

            // 2. Seed Hotels
            Hotel hotel1 = new Hotel();
            hotel1.setName("The Ritz Paris");
            hotel1.setLocation("Paris");
            hotel1.setAddress("15 Place Vendôme, 75001 Paris, France");
            hotel1.setRating(4.9);
            hotel1.setImageUrl("https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel1.setBasePrice(800.0);
            hotel1.setCreatedAt(LocalDate.now());
            hotel1.setUpdatedAt(LocalDate.now());
            hotel1 = hotelRepository.save(hotel1);

            Hotel hotel2 = new Hotel();
            hotel2.setName("The Savoy");
            hotel2.setLocation("London");
            hotel2.setAddress("Strand, London WC2R 0EZ, UK");
            hotel2.setRating(4.8);
            hotel2.setImageUrl("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel2.setBasePrice(600.0);
            hotel2.setCreatedAt(LocalDate.now());
            hotel2.setUpdatedAt(LocalDate.now());
            hotel2 = hotelRepository.save(hotel2);

            Hotel hotel3 = new Hotel();
            hotel3.setName("Aman Tokyo");
            hotel3.setLocation("Tokyo");
            hotel3.setAddress("The Otemachi Tower, 1-5-6 Otemachi, Chiyoda-ku, Tokyo");
            hotel3.setRating(5.0);
            hotel3.setImageUrl("https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel3.setBasePrice(900.0);
            hotel3.setCreatedAt(LocalDate.now());
            hotel3.setUpdatedAt(LocalDate.now());
            hotel3 = hotelRepository.save(hotel3);

            Hotel hotel4 = new Hotel();
            hotel4.setName("Park Hyatt Sydney");
            hotel4.setLocation("Sydney");
            hotel4.setAddress("7 Hickson Rd, The Rocks NSW 2000, Australia");
            hotel4.setRating(4.8);
            hotel4.setImageUrl("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel4.setBasePrice(750.0);
            hotel4.setCreatedAt(LocalDate.now());
            hotel4.setUpdatedAt(LocalDate.now());
            hotel4 = hotelRepository.save(hotel4);

            Hotel hotel5 = new Hotel();
            hotel5.setName("Hotel Hassler");
            hotel5.setLocation("Rome");
            hotel5.setAddress("Piazza della Trinità dei Monti, 6, 00187 Roma RM, Italy");
            hotel5.setRating(4.7);
            hotel5.setImageUrl("https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel5.setBasePrice(500.0);
            hotel5.setCreatedAt(LocalDate.now());
            hotel5.setUpdatedAt(LocalDate.now());
            hotel5 = hotelRepository.save(hotel5);

            Hotel hotel6 = new Hotel();
            hotel6.setName("The Beverly Hills Hotel");
            hotel6.setLocation("Los Angeles");
            hotel6.setAddress("9641 Sunset Blvd, Beverly Hills, CA 90210, USA");
            hotel6.setRating(4.9);
            hotel6.setImageUrl("https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            hotel6.setBasePrice(850.0);
            hotel6.setCreatedAt(LocalDate.now());
            hotel6.setUpdatedAt(LocalDate.now());
            hotel6 = hotelRepository.save(hotel6);

            // 3. Seed Rooms
            createRoom(hotel1, RoomType.SINGLE, 800.0, 10);
            createRoom(hotel1, RoomType.DOUBLE, 1200.0, 15);
            createRoom(hotel1, RoomType.DELUXE, 2500.0, 5);

            createRoom(hotel2, RoomType.SINGLE, 600.0, 20);
            createRoom(hotel2, RoomType.DOUBLE, 850.0, 15);
            createRoom(hotel2, RoomType.DELUXE, 1500.0, 10);

            createRoom(hotel3, RoomType.SINGLE, 900.0, 10);
            createRoom(hotel3, RoomType.DOUBLE, 1400.0, 20);
            createRoom(hotel3, RoomType.DELUXE, 3000.0, 8);

            createRoom(hotel4, RoomType.SINGLE, 750.0, 12);
            createRoom(hotel4, RoomType.DOUBLE, 1100.0, 15);
            createRoom(hotel4, RoomType.DELUXE, 2200.0, 6);

            createRoom(hotel5, RoomType.SINGLE, 500.0, 15);
            createRoom(hotel5, RoomType.DOUBLE, 800.0, 20);
            createRoom(hotel5, RoomType.DELUXE, 1400.0, 8);

            createRoom(hotel6, RoomType.SINGLE, 850.0, 10);
            createRoom(hotel6, RoomType.DOUBLE, 1300.0, 15);
            createRoom(hotel6, RoomType.DELUXE, 2800.0, 5);

            System.out.println("Seeding complete! Admin: admin@luxestay.com / admin123 | User: user@luxestay.com / user123");
        }
    }

    private void createRoom(Hotel hotel, RoomType type, double price, int count) {
        Room room = new Room();
        room.setHotel(hotel);
        room.setRoomType(type);
        room.setPricePerNight(price);
        room.setTotalRooms(count);
        room.setCreatedAt(LocalDateTime.now());
        roomRepository.save(room);
    }
}
