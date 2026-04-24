package com.example.HotelBackend.service.serviceImpl;

import com.example.HotelBackend.dto.UserRequestDTO;
import com.example.HotelBackend.dto.UserResponseDTO;
import com.example.HotelBackend.entity.User;
import com.example.HotelBackend.enums.UserRole;
import com.example.HotelBackend.mapper.UserMapper;
import com.example.HotelBackend.repository.UserRepository;
import com.example.HotelBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(userRequestDTO);
        user.setRole(UserRole.USER);
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());

        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser, null);
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toResponseDTO(user, null);
    }

    @Override
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toResponseDTO(user, null);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> userMapper.toResponseDTO(user, null))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userRequestDTO.getName());
        user.setPhone(userRequestDTO.getPhone());
        user.setUpdatedAt(LocalDate.now());

        User updatedUser = userRepository.save(user);
        return userMapper.toResponseDTO(updatedUser, null);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}
