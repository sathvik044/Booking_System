package com.example.HotelBackend.service;

import com.example.HotelBackend.dto.UserRequestDTO;
import com.example.HotelBackend.dto.UserResponseDTO;
import java.util.List;

public interface UserService {
    UserResponseDTO registerUser(UserRequestDTO userRequestDTO);
    UserResponseDTO getUserById(Long id);
    UserResponseDTO getUserByEmail(String email);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO);
    void deleteUser(Long id);
}
