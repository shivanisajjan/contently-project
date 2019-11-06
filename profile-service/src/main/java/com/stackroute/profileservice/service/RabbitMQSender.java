package com.stackroute.profileservice.service;

import com.stackroute.profileservice.model.Profile;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class RabbitMQSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    @Value("${profile.rabbitmq.exchange}")
    private String exchange;

    @Value("${profile.rabbitmq.routingkey}")
    private String routingkey;


    public void sendProfile(Profile profile) {
        rabbitTemplate.convertAndSend(exchange, routingkey, profile);
    }

}