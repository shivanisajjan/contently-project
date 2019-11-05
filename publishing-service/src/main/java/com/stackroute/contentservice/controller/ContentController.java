package com.stackroute.contentservice.controller;


import com.stackroute.contentservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.contentservice.exceptions.ContentDoesNotExistException;
import com.stackroute.contentservice.exceptions.InternalServerErrorException;
import com.stackroute.contentservice.exceptions.NullValueFieldException;
import com.stackroute.contentservice.model.Content;
import com.stackroute.contentservice.service.ContentService;
import com.stackroute.contentservice.service.RabbitMQSender;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
@Api(value="content", description="contentservice")
public class ContentController {

    private ContentService contentService;
    private RabbitMQSender rabbitMQSender;
    private ResponseEntity responseEntity;

    @Autowired
    public ContentController(ContentService contentService,RabbitMQSender rabbitMQSender) {
        this.contentService = contentService;
        this.rabbitMQSender = rabbitMQSender;
    }



    @ApiOperation(value = "save new content")
    @PostMapping(value = "/save")
    public ResponseEntity<Content> registerUser(@RequestBody Content content) throws ContentAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {

        content.setId(contentService.getNextSequence("customSequences"));
        return new ResponseEntity<Content> (contentService.saveContent(content), HttpStatus.CREATED);
    }

    @ApiOperation(value = "deletes in a user")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) throws InternalServerErrorException, ContentDoesNotExistException {
        Optional<Content> content = contentService.deleteContent(id);
        return new ResponseEntity<>(content, HttpStatus.OK);
    }

    @ApiOperation(value = "updates the existing content")
    @ApiResponses(
            value = { @ApiResponse(code = 401,message = "unauthorized"),
                    @ApiResponse(code = 201,message = "returning the whole content object")}
    )
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Content content) throws InternalServerErrorException, ContentDoesNotExistException {
        contentService.updateContent(content);
        return new ResponseEntity<Content>(content, HttpStatus.OK);
    }

    @ApiOperation(value = "get the existing content by title")
    @GetMapping(value = "/content/{title}")
    public ResponseEntity<?> getContent(@PathVariable("title") String title) throws ContentDoesNotExistException,InternalServerErrorException
    {


        responseEntity=new ResponseEntity<>(contentService.findByTitle(title),HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "get the existing content by editor id")

    @GetMapping(value = "/content/editor/{id}")
    public ResponseEntity<?> getByEditorId(@PathVariable("id") int id) throws InternalServerErrorException
    {


        responseEntity=new ResponseEntity<>(contentService.findByEditorId(id),HttpStatus.OK);
        return responseEntity;
    }
}
