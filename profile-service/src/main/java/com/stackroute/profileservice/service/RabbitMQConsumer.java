//package com.stackroute.profileservice.service;
//import com.stackroute.profileservice.controller.ProfileController;
//import com.stackroute.profileservice.model.DTOUser;
//import com.stackroute.profileservice.model.Profile;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class RabbitMQConsumer {
//    @Autowired
//    private ProfileController profileController;
//    private Profile profile;
//
//    @RabbitListener(queues = "registry_queue")
//    public void recievedMessage(DTOUser user) {
//            profile.setUserId(user.getId());
//
//    profileController.getUser(user);
//    }
//
//}