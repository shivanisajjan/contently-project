package com.stackroute.usermanagement.controller;


import com.stackroute.usermanagement.exceptions.*;
import com.stackroute.usermanagement.model.AuthenticationResponse;
import com.stackroute.usermanagement.model.DTOUser;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.service.RabbitMQSender;
import com.stackroute.usermanagement.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping("api/v1/user")
@Slf4j
@Api(value="user", description="userservice")
public class UserController {

    private UserService userService;
    private ResponseEntity responseEntity;
    private RabbitMQSender rabbitMQSender;

    @Autowired
    public UserController(UserService userService,RabbitMQSender rabbitMQSender) {
        this.userService = userService;
        this.rabbitMQSender=rabbitMQSender;
    }


    @ApiOperation(value = "register new profile")

    @PostMapping(value = "/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws UserAlreadyExistsExceptions, InternalServerErrorException {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));//field checking
        User user1=userService.saveUser(user);
        log.debug("user saved:{}",user1);
        DTOUser dtouser=new DTOUser();
        dtouser.setId(user1.getId());
        System.out.println(user1.getId());
        System.out.println(dtouser.getId());
        dtouser.setUsername(user1.getUsername());
        dtouser.setRole(user1.getRole());
        dtouser.setPhoneNumber(user1.getPhoneNumber());
        dtouser.setNationality(user1.getNationality());
        dtouser.setLastName(user1.getLastName());
        dtouser.setGender(user1.getGender());
        dtouser.setFirstName(user1.getFirstName());
        dtouser.setEmail(user1.getEmail());
        dtouser.setDob(user1.getDob());
        dtouser.setAddressLine1(user1.getAddressLine1());
        dtouser.setAddressLine2(user1.getAddressLine2());
        dtouser.setAddressLine3(user1.getAddressLine3());
        rabbitMQSender.sendRegistry(dtouser);
        return new ResponseEntity<User> (user1, HttpStatus.CREATED);
    }


    @ApiOperation(value = "logs in a user")
    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException {
        String jwtToken = "";
        User userTemp=userService.findByUsername(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", new ArrayList<>());
        jwtToken = Jwts.builder().setClaims(claims).setSubject(user.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS512, "secretkey").compact();
        AuthenticationResponse authenticationResponse=new AuthenticationResponse();
        authenticationResponse.setAuthResponse(jwtToken);
        authenticationResponse.setRole(userTemp.getRole());
        System.out.println(jwtToken);
         return new ResponseEntity<AuthenticationResponse> (authenticationResponse, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "deletes a user")
    @DeleteMapping(value = "/delete/{username}")
    public ResponseEntity<User> delete(@PathVariable String username) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        User userTemp=userService.deleteUser(username);
        return new ResponseEntity<User>(userTemp, HttpStatus.OK);
    }

    @ApiOperation(value = "updates the existing user")
    @ApiResponses(
            value = { @ApiResponse(code = 401,message = "unauthorized"),
                    @ApiResponse(code = 201,message = "returning the whole user object")}
    )

    @PutMapping(value = "/update")
    public ResponseEntity<User> update(@RequestBody User user) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        User userTemp=userService.updateUser(user);
        return new ResponseEntity<User>(userTemp, HttpStatus.OK);
    }

    @ApiOperation(value = "get user by username")
    @GetMapping(value = "{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username) throws InternalServerErrorException, InvalidCredentialException, UserDoesNotExistException {
        return new ResponseEntity<User>(userService.getByUsername(username), HttpStatus.OK);
    }

}
