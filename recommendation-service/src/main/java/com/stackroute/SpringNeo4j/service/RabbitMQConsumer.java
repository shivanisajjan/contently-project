package com.stackroute.SpringNeo4j.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;


@Service
public class RabbitMQConsumer {

    @RabbitListener(queues = "registry_queue")
    public void recievedMessage(String message) {
        System.out.println(message);
    }

    @RabbitListener(queues = "profile_queue")
    public void recievedMessage1(String message) {
        System.out.println(message);
    }


}