package com.stackroute.usermanagement.controller;


import com.stackroute.usermanagement.exceptions.*;
import com.stackroute.usermanagement.model.AuthenticationResponse;
import com.stackroute.usermanagement.model.DTOUser;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.service.RabbitMQSender;
import com.stackroute.usermanagement.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;


@CrossOrigin
@RestController
@RequestMapping("api/v1/user")
@Slf4j
public class
UserController {

    private UserService userService;
    private ResponseEntity responseEntity;
    private RabbitMQSender rabbitMQSender;

    @Autowired
    public UserController(UserService userService,RabbitMQSender rabbitMQSender) {
        this.userService = userService;
        this.rabbitMQSender=rabbitMQSender;
    }



    @PostMapping(value = "/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws UserAlreadyExistsExceptions, InternalServerErrorException {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));//field checking
        User user1=userService.saveUser(user);
        return new ResponseEntity<User> (user1, HttpStatus.CREATED);
    }


    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException {
        String jwtToken = "";
        User u=userService.findByUsername(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", new ArrayList<>());
        jwtToken = Jwts.builder().setClaims(claims).setSubject(user.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS512, "secretkey").compact();
        AuthenticationResponse authenticationResponse=new AuthenticationResponse();
        authenticationResponse.setAuthResponse(jwtToken);
        authenticationResponse.setRole(u.getRole());
        System.out.println(jwtToken);
         return new ResponseEntity<AuthenticationResponse> (authenticationResponse, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(value = "/delete/{username}")
    public ResponseEntity<String> delete(@PathVariable String username) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        userService.deleteUser(username);
        return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<String> update(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        User uname=userService.getByUsername(user.getUsername());
        user.setPassword(uname.getPassword());
        DTOUser dtouser=new DTOUser();
        dtouser.setId(user.getId());
        dtouser.setUsername(user.getUsername());
        dtouser.setRole(user.getRole());
        dtouser.setPhoneNumber(user.getPhoneNumber());
        dtouser.setNationality(user.getNationality());
        dtouser.setLastName(user.getLastName());
        dtouser.setGender(user.getGender());
        dtouser.setFirstName(user.getFirstName());
        dtouser.setEmail(user.getEmail());
        dtouser.setDob(user.getDob());
        dtouser.setAddressLine1(user.getAddressLine1());
        dtouser.setAddressLine2(user.getAddressLine2());
        dtouser.setAddressLine3(user.getAddressLine3());
        rabbitMQSender.sendRegistry(dtouser);
        userService.updateUser(user);
        return new ResponseEntity<String>("Updated Successfully", HttpStatus.OK);
    }

    @GetMapping(value = "{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.add("Access-Control-Allow-Origin","http://localhost:4200");
//        responseHeaders.add("Content-Type","application/json");
        return new ResponseEntity<User>(userService.getByUsername(username) ,HttpStatus.OK);
    }
    @GetMapping(value = "/role/{role}")
    public ResponseEntity<?> getByRole(@PathVariable String role) throws InternalServerErrorException, InvalidRoleInfoException {
        return new ResponseEntity<List<String>>(userService.getByRole(role), HttpStatus.OK);
    }



}
