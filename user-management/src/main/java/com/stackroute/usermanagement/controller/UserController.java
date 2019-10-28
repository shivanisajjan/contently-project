package com.stackroute.usermanagement.controller;


import com.stackroute.usermanagement.exceptions.*;
import com.stackroute.usermanagement.model.AuthenticationResponse;
import com.stackroute.usermanagement.model.DTOUser;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.service.RabbitMQSender;
import com.stackroute.usermanagement.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "http://localhost", maxAge = 3600)
@RestController
@RequestMapping("api/v1/user")
public class
UserController {

    private UserService userService;
    private ResponseEntity responseEntity;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping(value = "/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws UserAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));//field checking
        return new ResponseEntity<User> (userService.saveUser(user), HttpStatus.CREATED);
    }


    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException {
        String jwtToken = "";
        userService.findByUsername(user);
        jwtToken = Jwts.builder().setSubject(user.getUsername()).claim("roles", "user").setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretkey").compact();
        return new ResponseEntity<AuthenticationResponse> (new AuthenticationResponse(jwtToken), HttpStatus.ACCEPTED);
    }

    @DeleteMapping(value = "/delete/{username}")
    public ResponseEntity<String> delete(@PathVariable String username) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        userService.deleteUser(username);
        return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<String> update(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        userService.updateUser(user);
        return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
    }
}
