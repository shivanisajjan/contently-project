package com.stackroute.reccomendation.service;

import com.stackroute.reccomendation.domain.User;
import com.stackroute.reccomendation.domain.UserDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RabbitMQConsumer {

    @Autowired
    UserService userService;
    @Autowired
    User user;

    public RabbitMQConsumer() {

    }

    public RabbitMQConsumer(UserService userService, User user) {
        this.userService = userService;
        this.user = user;
    }

    @RabbitListener(queues = "registry_queue")
    public void recievedMessage(UserDto userDto) {
        System.out.println("got username is"+userDto.getUsername());

        user.setName(userDto.getUsername());
     user.setGender(userDto.getGender());
     user.setNationality(userDto.getNationality());

     String temp[]=userDto.getDob().split("/");

     if(temp.length!=0)
     user.setAgeGroup(temp[temp.length-1]);






        System.out.println(userService.saveUser(this.user));

    }


    @RabbitListener(queues = "profile_queue")
    public void recievedMessage1(String message) {
        System.out.println(message);
    }


}