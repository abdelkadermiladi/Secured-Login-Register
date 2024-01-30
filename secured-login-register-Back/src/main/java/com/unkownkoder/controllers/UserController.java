package com.unkownkoder.controllers;

import com.unkownkoder.models.ApplicationUser;
import com.unkownkoder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/")
    public String helloUserController(){
        return "User access level";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users")
    public ResponseEntity<List<ApplicationUser>> findAllUsers() {
        List<ApplicationUser> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{username}")
    public ResponseEntity<ApplicationUser> getUserByUsername(@PathVariable String username) {
        Optional<ApplicationUser> userOptional = userRepository.findByUsername(username);

        ApplicationUser user = userOptional.orElse(null);

        if (user != null) {
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            // User not found
            return ResponseEntity.notFound().build();
        }
    }
}