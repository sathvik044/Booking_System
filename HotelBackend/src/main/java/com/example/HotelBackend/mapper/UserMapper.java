package com.example.HotelBackend.mapper;
import org.springframework.stereotype.Component;
import com.example.HotelBackend.entity.User;
import com.example.HotelBackend.dto.UserRequestDTO;
import com.example.HotelBackend.dto.UserResponseDTO;
@Component
public class UserMapper {

    // DTO → Entity
    public User toEntity(UserRequestDTO dto) {
        if (dto == null) return null;

        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword()) 
                .phone(dto.getPhone())
                .build();
    }

    // Entity → Response DTO
    public UserResponseDTO toResponseDTO(User user, String token) {
        if (user == null) return null;

        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .build();
    }
}
