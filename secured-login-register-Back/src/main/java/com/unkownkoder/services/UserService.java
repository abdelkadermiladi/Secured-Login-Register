package com.unkownkoder.services;

import com.unkownkoder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


        //if(!username.equals("Ethan")) throw new UsernameNotFoundException("Not Ethan");
        //Set<Role> roles = new HashSet<>();
        //roles.add(new Role(1,"USER"));
        //return new ApplicationUser(1,"Ethan",encoder.encode("password"),roles);

        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));

    }

}