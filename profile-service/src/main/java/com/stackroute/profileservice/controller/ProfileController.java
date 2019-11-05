package com.stackroute.profileservice.controller;

import com.stackroute.profileservice.model.Profile;
import com.stackroute.profileservice.service.ProfileService;
import com.stackroute.profileservice.service.ProfileServiceImpl;
import com.stackroute.profileservice.service.RabbitMQSender;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/profile")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api(value="profile", description="profileservice")
public class ProfileController {
    private ProfileService profileService;
    private ResponseEntity responseEntity;
    private RabbitMQSender rabbitMQSender;


    @Autowired
    public ProfileController(ProfileService profileService,RabbitMQSender rabbitMQSender) {
        this.profileService = profileService;
        this.rabbitMQSender=rabbitMQSender;
    }

    @ApiOperation(value = "saves new profile")
    @PostMapping
    public ResponseEntity<?> saveProfile(@RequestBody Profile profile)  {
        profile.setId(profileService.getNextSequence("customSequences"));
        responseEntity = new ResponseEntity<Profile>(this.profileService.saveProfile(profile), HttpStatus.CREATED);
        rabbitMQSender.sendProfile(profile);
        return responseEntity;
    }

    @ApiOperation(value = "get all profiles")
    @GetMapping
    public List<Profile> getAllProfile() {
        return (this.profileService.getallProfile());
    }



    @ApiOperation(value = "updates the existing track with the new track")
    @ApiResponses(
            value = { @ApiResponse(code = 401,message = "unauthorized"),
                    @ApiResponse(code = 201,message = "returning the whole track")}
    )
    @PutMapping
    public ResponseEntity<?> updateMovie(@RequestBody Profile profile) {
        profileService.update(profile);
        responseEntity = new ResponseEntity<List<Profile>>(this.profileService.getallProfile(), HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "deletes profile")
    @DeleteMapping
    public ResponseEntity<?> deleteMovie(@RequestBody int id){
        profileService.deleteProfile(id);
        responseEntity = new ResponseEntity<String>("Successfully deleted", HttpStatus.OK);
        return responseEntity;
    }

}
