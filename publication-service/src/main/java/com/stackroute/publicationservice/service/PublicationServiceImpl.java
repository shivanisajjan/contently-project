package com.stackroute.publicationservice.service;


//import com.stackroute.publicationservice.Sequence.Custom;
import com.stackroute.publicationservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.publicationservice.exceptions.ContentDoesNotExistException;
import com.stackroute.publicationservice.exceptions.InternalServerErrorException;
import com.stackroute.publicationservice.exceptions.NullValueFieldException;
import com.stackroute.publicationservice.model.Publications;
import com.stackroute.publicationservice.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
//import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class PublicationServiceImpl implements PublicationService {

    private PublicationRepository publicationRepository;
    private MongoOperations mongo;

    @Autowired
    public PublicationServiceImpl(PublicationRepository publicationRepository, MongoOperations mongo) {
        this.publicationRepository = publicationRepository;
        this.mongo = mongo;
    }

    public Publications saveContent(Publications publications) throws ContentAlreadyExistsExceptions, NullValueFieldException, InternalServerErrorException {

        try {
            Publications u = publicationRepository.save(publications);
            return u;
        }catch (Exception e){
            throw new InternalServerErrorException();
        }

    }

   public List<Publications> findByTitle(String title) {
            return publicationRepository.findByTitle(title);
//        try {
//            return publicationRepository.findByTitle(title);
//        }
//        catch(Exception ex){
//            throw new InternalServerErrorException();
//        }
    }

    @Override
    public void deleteContent(int id) throws ContentDoesNotExistException, InternalServerErrorException {
        try {
            publicationRepository.deleteById(id);
        }catch (Exception e){
            throw new ContentDoesNotExistException();
        }
    }
    @Override
    public Publications updateContent(Publications user) throws ContentDoesNotExistException,InternalServerErrorException{
        if(publicationRepository.findById(user.getId()).isPresent()){
            try{
                return publicationRepository.save(user);
            }
            catch (Exception ex){
                throw new ContentDoesNotExistException();
            }

        }
        else {
            throw new ContentDoesNotExistException();
        }
    }




    public List<Publications> findByEditorId(int id) throws InternalServerErrorException
    {

        try
        {
            return publicationRepository.findByEditorId((id));
        }
        catch (Exception e)
        {
            throw new InternalServerErrorException();
        }



    }


//    public int getNextSequence(String seqName)
//        {
//            Custom counter = mongo.findAndModify(
//                    query(where("_id").is(seqName)),
//                    new Update().inc("seq",1),
//                    options().returnNew(true).upsert(true),
//                    Custom.class);
//            return counter.getSeq();
//        }

}
