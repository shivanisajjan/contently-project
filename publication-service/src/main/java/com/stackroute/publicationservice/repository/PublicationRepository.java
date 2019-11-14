package com.stackroute.publicationservice.repository;

import com.stackroute.publicationservice.model.Publications;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends MongoRepository<Publications, Integer> {


    @Query("{'title' : ?0}")
    List<Publications> findByTitle(String title);



    @Query("{'editorIds' : { $all: [ ?0 ] } }")
    List<Publications> findByEditorId(int id);



}
