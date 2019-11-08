package com.stackroute.notification.controller;


import com.stackroute.notification.domain.Notification;
import com.stackroute.notification.exceptions.InternalServerErrorException;
import com.stackroute.notification.service.NotificationService;
import com.stackroute.notification.service.RabbitMQSender;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@org.springframework.stereotype.Controller
@RestController
@RequestMapping("api")
public class Controller {

    NotificationService notificationService;

    private final SimpMessagingTemplate template;
    private RabbitMQSender rabbitMQSender;
    @Autowired
    Controller(NotificationService notificationService, SimpMessagingTemplate template, RabbitMQSender rabbitMQSender){

        this.notificationService = notificationService;
        this.template = template;
        this.rabbitMQSender = rabbitMQSender;
    }



    @RabbitListener(queues = "notification-queue")
    public void recievedMessage(Notification notification) {

        this.template.convertAndSendToUser(notification.getReceiver(),"/notif",notification.getMessage());

    }

    @PostMapping(value = "/send")
    public ResponseEntity<?> saveNotification(@RequestBody Notification notification) throws InternalServerErrorException
    {
        rabbitMQSender.send(notification);
        return new ResponseEntity<>(notificationService.saveNotification(notification), HttpStatus.CREATED);
    }
    @GetMapping(value = "/{receiver}")
    public ResponseEntity<?> getByReceiver(@PathVariable("receiver") String receiver) throws InternalServerErrorException
    {
        return new ResponseEntity<>(notificationService.findByReceiver(receiver), HttpStatus.OK);
    }

}
