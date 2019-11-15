package com.stackroute.reccomendation.service;

import com.stackroute.reccomendation.domain.PublicationsDto;
import com.stackroute.reccomendation.domain.User;
import com.stackroute.reccomendation.domain.UserDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;


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
        user.setAgeGroup("t");
        user.setNationality("i");
        user.setName("m");
            if(userDto.getUsername()!=null)
                user.setName(userDto.getUsername());
        if(userDto.getGender()!=null)
     user.setGender(userDto.getGender());
        if(userDto.getNationality()!=null)
     user.setNationality(userDto.getNationality());
        if(userDto.getDob()!=null)
        {
            int dobYear=0;
            String temp[]=userDto.getDob().split("/");
            dobYear=Integer.parseInt(temp[temp.length-1]);
            int year = Calendar.getInstance().get(Calendar.YEAR);//agegroup -10-k  -20-t  -30-a 40-o
            int decideValue=year-dobYear;
            if(decideValue<15)
                user.setAgeGroup("k");
            else
            if(decideValue<25)
            user.setAgeGroup("t");
            else
            if(decideValue<45)
                user.setAgeGroup("a");
            else
                user.setAgeGroup("o");

        }






        System.out.println(userService.saveUser(this.user));

    }


    @RabbitListener(queues = "profile_queue")
    public void recievedMessage1(String message) {
        System.out.println(message);
    }

    @RabbitListener(queues = "publication_queue")
    public void recievedMessage2(PublicationsDto publicationsDto) {

        userService.savePublication(publicationsDto.getTitle(),publicationsDto.getAuthorName());
        System.out.println("message received="+publicationsDto.getTitle());
    }





}