package com.stackroute.publicationservice.controller;


import com.stackroute.publicationservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.publicationservice.exceptions.ContentDoesNotExistException;
import com.stackroute.publicationservice.exceptions.InternalServerErrorException;
import com.stackroute.publicationservice.exceptions.NullValueFieldException;
import com.stackroute.publicationservice.model.Publications;
import com.stackroute.publicationservice.service.PublicationService;
import com.stackroute.publicationservice.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class PublicationController {

    private PublicationService publicationService;
    private RabbitMQSender rabbitMQSender;
    private ResponseEntity responseEntity;

    @Autowired
    public PublicationController(PublicationService publicationService, RabbitMQSender rabbitMQSender) {
        this.publicationService = publicationService;
        this.rabbitMQSender = rabbitMQSender;
    }


    @PostMapping(value = "/save")
    public ResponseEntity<Publications> registerUser(@RequestBody Publications content) throws ContentAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {
        content.setId(publicationService.getNextSequence("customSequences"));
        return new ResponseEntity<Publications>(publicationService.saveContent(content), HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) throws InternalServerErrorException, ContentDoesNotExistException {
        publicationService.deleteContent(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Publications content) throws InternalServerErrorException, ContentDoesNotExistException {
        publicationService.updateContent(content);
        return new ResponseEntity<Publications>(content, HttpStatus.OK);
    }

    @GetMapping(value = "/{title}")
    public ResponseEntity<?> getContent(@PathVariable("title") String title) throws ContentDoesNotExistException {

        responseEntity = new ResponseEntity<List<Publications>>(publicationService.findByTitle(title), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping(value = "/book/{id}")
    public ResponseEntity<?> getByEditorId(@PathVariable("id") int id) throws InternalServerErrorException {


        responseEntity = new ResponseEntity<>(publicationService.findByEditorId(id), HttpStatus.OK);
        return responseEntity;
    }
}
