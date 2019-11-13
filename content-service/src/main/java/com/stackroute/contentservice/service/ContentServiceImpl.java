package com.stackroute.contentservice.service;


import com.stackroute.contentservice.Sequence.Custom;
import com.stackroute.contentservice.exceptions.ContentAlreadyExistsExceptions;
import com.stackroute.contentservice.exceptions.ContentDoesNotExistException;
import com.stackroute.contentservice.exceptions.InternalServerErrorException;
import com.stackroute.contentservice.exceptions.NullValueFieldException;
import com.stackroute.contentservice.model.Content;
import com.stackroute.contentservice.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ContentServiceImpl implements ContentService {

    @Autowired
    private ContentRepository contentRepository;
    @Autowired
    private MongoOperations mongo;

    public Content saveContent(Content content) throws ContentAlreadyExistsExceptions,NullValueFieldException,InternalServerErrorException {

        try {
            Content u = contentRepository.save(content);
            return u;
        }
        catch (Exception e){
            throw new InternalServerErrorException();
        }

    }

   public Content findByTitle(String title) throws InternalServerErrorException {
        try {
            return contentRepository.findByTitle(title);
        }
        catch(Exception ex){
            throw new InternalServerErrorException();
        }


    }

    @Override
    public Content deleteContent(String title) throws ContentDoesNotExistException, InternalServerErrorException {
        Content content = contentRepository.findByTitle(title);
        if (content==null){
            throw new ContentDoesNotExistException();
        }
        else {
            contentRepository.delete(content);
            return content;
        }
    }
    @Override
    public Content updateContent(Content content) throws ContentDoesNotExistException,InternalServerErrorException{
        if(contentRepository.findById(content.getId()).isPresent()){
            return contentRepository.save(content);
        }
        else
        {
            throw new ContentDoesNotExistException();
        }
    }


    public List<Content> findByName(String name) throws InternalServerErrorException
    {
        try
        {
            List<Content> content=contentRepository.findByName(name);
            if(content.get(0).getAuthorName()==name){
                System.out.println("Yessss,I am an author");
            }
            else {
                System.out.println("yess,I am an editor/illustrator");
            }
            return contentRepository.findByName(name);
        }
        catch (Exception e)
        {
            throw new InternalServerErrorException();
        }
    }

//    @Override
//    public Content saveChapters(Content content) throws InternalServerErrorException {
//        Content saveChapter = content;
//        try{
//            List<Content> authorList=findByName(content.getAuthorName());
//            for (Content temp : authorList) {
//                if(temp.getTitle().equals(content.getTitle())){
//                    temp.setStatus(content.getStatus());
//                    saveChapter=contentRepository.save(temp);
//                }
//            }
//        }
//        catch (Exception e){
//            throw new InternalServerErrorException();
//        }
//        System.out.println("save:"+saveChapter.toString());
//        return saveChapter;
//    }

    @Override
    public Content findTitleById(int id) throws ContentDoesNotExistException {
        Content content=contentRepository.findById(id).get();
        System.out.println(content.toString());
        if(content==null){
            throw new ContentDoesNotExistException();
        }
        return content;
    }


    public int getNextSequence(String seqName)
        {
            Custom counter = mongo.findAndModify(
                    query(where("_id").is(seqName)),
                    new Update().inc("seq",1),
                    options().returnNew(true).upsert(true),
                    Custom.class);
            return counter.getSeq();
        }

}
