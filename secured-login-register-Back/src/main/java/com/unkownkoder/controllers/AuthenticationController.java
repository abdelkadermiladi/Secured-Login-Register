package com.unkownkoder.controllers;

import com.unkownkoder.models.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.unkownkoder.models.ApplicationUser;
import com.unkownkoder.models.RegistrationDTO;
import com.unkownkoder.services.AuthenticationService;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody RegistrationDTO body) {
        LoginResponseDTO loginResponse = authenticationService.loginUser(body.getUsername(), body.getPassword());

        if (loginResponse.getUser() != null && !loginResponse.getJwt().isEmpty()) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/AuthenticatedUser")
    public ResponseEntity<Map<String, String>> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();

            // Extracting the roles from authorities
            List<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Hello, " + username + "! Roles: " + String.join(", ", roles));

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Unauthorized"));
        }
    }





}