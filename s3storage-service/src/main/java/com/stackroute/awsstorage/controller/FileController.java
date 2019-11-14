package com.stackroute.awsstorage.controller;

import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.stackroute.awsstorage.service.AmazonClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;


@CrossOrigin
@RestController
@RequestMapping("api/v1")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    private AmazonClient amazonClient;

    @Autowired
    public FileController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    @PostMapping("/file/{filename}")
    public ResponseEntity<?> uploadFile(@RequestPart(value = "file") MultipartFile file,@PathVariable String filename) {
        return new ResponseEntity<String>(this.amazonClient.uploadFile(file,filename), HttpStatus.CREATED);
    }


    @DeleteMapping("/file")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }

    @GetMapping("/file/{filename}")
    public ResponseEntity<InputStreamResource> getFile(@PathVariable String filename)
    {
        return this.amazonClient.getFile(filename);
    }
}

