package com.stackroute.reccomendation.service;

import com.stackroute.reccomendation.domain.PublicationsDto;
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


            if(userDto.getUsername()!=null)
                user.setName(userDto.getUsername());
//        if(userDto.getGender()!=null)
//     user.setGender(userDto.getGender());
//        if(userDto.getNationality()!=null)
//     user.setNationality(userDto.getNationality());
//        if(use)






        System.out.println(userService.saveUser(this.user));

    }


    @RabbitListener(queues = "profile_queue")
    public void recievedMessage1(String message) {
        System.out.println(message);
    }

    @RabbitListener(queues = "publication_queue")
    public void recievedMessage2(PublicationsDto publicationsDto) {
        System.out.println("message received="+publicationsDto.getTitle());
    }





}