package com.unkownkoder.controllers;

import com.unkownkoder.models.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unkownkoder.models.ApplicationUser;
import com.unkownkoder.models.RegistrationDTO;
import com.unkownkoder.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getGender());
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


}