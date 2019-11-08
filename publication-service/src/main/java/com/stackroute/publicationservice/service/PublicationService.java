package com.stackroute.publicationservice.service;

import com.stackroute.publicationservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.publicationservice.exceptions.ContentDoesNotExistException;
import com.stackroute.publicationservice.exceptions.InternalServerErrorException;
import com.stackroute.publicationservice.exceptions.NullValueFieldException;
import com.stackroute.publicationservice.model.Publications;

import java.util.List;


public interface PublicationService {


    Publications saveContent(Publications publications) throws ContentAlreadyExistsExceptions, NullValueFieldException, InternalServerErrorException;

   List<Publications> findByTitle(String title) throws InternalServerErrorException;

   void deleteContent(int id) throws ContentDoesNotExistException,InternalServerErrorException;

   Publications updateContent(Publications publications) throws ContentDoesNotExistException,InternalServerErrorException;


    List<Publications> findByEditorId(int id) throws InternalServerErrorException;


    int getNextSequence(String seq);
}
