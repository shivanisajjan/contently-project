package com.stackroute.contentservice.controller;


import com.stackroute.contentservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.contentservice.exceptions.ContentDoesNotExistException;
import com.stackroute.contentservice.exceptions.InternalServerErrorException;
import com.stackroute.contentservice.exceptions.NullValueFieldException;
import com.stackroute.contentservice.model.Content;
import com.stackroute.contentservice.service.ContentService;
import com.stackroute.contentservice.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class ContentController {

    private ContentService contentService;
    private RabbitMQSender rabbitMQSender;
    private ResponseEntity responseEntity;

    @Autowired
    public ContentController(ContentService contentService,RabbitMQSender rabbitMQSender) {
        this.contentService = contentService;
        this.rabbitMQSender = rabbitMQSender;
    }
    @PostMapping(value = "/content")
    public ResponseEntity<Content> saveBook(@RequestBody Content content) throws ContentAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {
        rabbitMQSender.sendContent(content);
        content.setId(contentService.getNextSequence("customSequences"));
        return new ResponseEntity<Content> (contentService.saveContent(content), HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/{title}")
    public ResponseEntity<?> delete(@PathVariable String title) throws InternalServerErrorException, ContentDoesNotExistException {
        Content deletedContent=contentService.deleteContent(title);
        return new ResponseEntity<Content>(deletedContent, HttpStatus.OK);
    }
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Content content) throws InternalServerErrorException, ContentDoesNotExistException {
        contentService.updateContent(content);
        return new ResponseEntity<Content>(content, HttpStatus.OK);
    }
    @GetMapping(value = "/contents/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name) throws InternalServerErrorException
    {
        responseEntity=new ResponseEntity<>(contentService.findByName(name),HttpStatus.OK);
        return responseEntity;
    }
    @GetMapping(value = "/content/id/{id}")
    public ResponseEntity<?> getTitleById(@PathVariable int id) throws InternalServerErrorException, ContentDoesNotExistException {
        responseEntity=new ResponseEntity<>(contentService.findTitleById(id),HttpStatus.OK);
        return responseEntity;
    }
//    @PostMapping(value = "/update/chapter")
//    public ResponseEntity<?> saveChapter(@RequestBody Content content) throws InternalServerErrorException
//    {
//        responseEntity=new ResponseEntity<>(contentService.saveChapters(content),HttpStatus.OK);
//        return responseEntity;
//    }
}
