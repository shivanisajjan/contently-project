package com.stackroute.profileservice.service;

import com.stackroute.profileservice.model.DTOUser;
import com.stackroute.profileservice.model.Profile;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

public class RabbitMQConsumer {

    ProfileService profileService;
    DTOUser user;

    public RabbitMQConsumer() {

    }

    @Autowired
    public RabbitMQConsumer(ProfileService profileService, DTOUser user) {
        this.profileService = profileService;
        this.user = user;
    }

    @RabbitListener(queues = "registry_queue1")
    public void recievedMessage(DTOUser userDto) {
        Profile profile=new Profile();
        profile.setUsername(userDto.getUsername());
        profile.setRole(userDto.getRole());
        profileService.saveProfile(profile);
    }
}
