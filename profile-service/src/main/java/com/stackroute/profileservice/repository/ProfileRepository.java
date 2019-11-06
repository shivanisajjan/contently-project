package com.stackroute.profileservice.repository;

import com.stackroute.profileservice.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends MongoRepository<Profile,Integer> {

}
