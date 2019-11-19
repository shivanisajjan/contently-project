package com.stackroute.profileservice.service;

import com.stackroute.profileservice.model.Chapter;
import com.stackroute.profileservice.model.Custom;
import com.stackroute.profileservice.model.Profile;
import com.stackroute.profileservice.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Query.query;

@Service
@Primary
public class ProfileServiceImpl implements ProfileService {
    private ProfileRepository profileRepository;
    private MongoOperations mongo;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository,MongoOperations mongo) {
        this.profileRepository = profileRepository;
        this.mongo=mongo;
    }

    @Override
    public Profile saveProfile(Profile profile){

        Profile profile1 =this.profileRepository.save(profile);
        System.out.println(profile1.toString());
        return profile1;
    }

    @Override
    public List<Profile> getallProfile() {
        return this.profileRepository.findAll();
    }

    @Override
    public Profile update(Profile profile){
        Profile profile1 =this.profileRepository.save(profile);
        return profile1;
    }

    @Override
    public boolean deleteProfile(int id){
        this.profileRepository.deleteById(id);
        return true;
    }

    @Override
    public double getByname(String name) {
       Profile profile= profileRepository.findByName(name);
       return profile.getCost();
    }

//    @Override
//    public Profile updateChapter(String username,Chapter chapter) {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
//        Date date = new Date();
//        chapter.setDate(date);
//        Profile profile=profileRepository.findByName(username);
//        System.out.println(dateFormat.format(date));
//        boolean flag=false;
//        for(Chapter chapter1:profile.getChapterRelease()){
//            if(chapter1.getBookId()==chapter.getBookId()){
//                long diff = chapter1.getDate().getTime() - chapter.getDate().getTime();
//                if(diff>7){
//                    chapter1.setBookId(chapter.getBookId());
//                    chapter1.setChapterIndex(chapter.getChapterIndex());
//                    flag=true;
//                    return chapter;
//                }
//            }
//            else{
//                return chapter;
//            }
//        }
//        if(flag==false){
//            List<Chapter> chapterList=profile.getChapterRelease();
//            chapterList.add(chapter);
//            profile.setChapterRelease(chapterList);
//            return chapter;
//        }
//        else {
//            return chapter;
//        }
//    }

    @Override
    public int getNextSequence(String seqName)
    {
        Custom counter = mongo.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("seq",1L),
                options().returnNew(true).upsert(true),
                Custom.class);
        return counter.getSeq();
    }

//
//
//    @Override
//    public List<ReaderProfile> getMoviesbyTitle(String title) throws MovieNotFoundGlobalException{
//        List<ReaderProfile> li=this.movieRepository.findBytitle(title);
//        if(li.isEmpty()){
//            throw new MovieNotFoundGlobalException();
//        }
//        return li;
//    }
}
