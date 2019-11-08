package com.stackroute.reccomendation.config;

import com.stackroute.reccomendation.domain.User;
import com.stackroute.reccomendation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component


public class Initializer implements CommandLineRunner {

 @Autowired
UserService userService;
 @Autowired
 User user;
    @Override

    public void run(String...args) throws Exception {

        System.out.println("command line runner working");





        userService.dop();
        userService.pop();
        userService.bob();

}}
