package com.stackroute.profileservice.service;

import com.stackroute.profileservice.model.Chapter;
import com.stackroute.profileservice.model.Profile;
import com.stackroute.profileservice.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Service
@Primary
public class ProfileServiceImpl implements ProfileService {
    private ProfileRepository profileRepository;
    private MongoOperations mongo;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository, MongoOperations mongo) {
        this.profileRepository = profileRepository;
        this.mongo = mongo;
    }

    @Override
    public Profile saveProfile(Profile profile) {

        Profile profile1 = this.profileRepository.save(profile);
        System.out.println(profile1.toString());
        return profile1;
    }

    @Override
    public List<Profile> getallProfile() {
        return this.profileRepository.findAll();
    }

    @Override
    public Profile update(Profile profile) {
        Profile profile1 = profileRepository.findByName(profile.getUsername());
        profile1.setCost(profile.getCost());
        profile1.setExperience(profile.getExperience());
        profile1.setInterest(profile.getInterest());
        profile1.setRatings(profile.getRatings());
        Profile profile2 = profileRepository.save(profile1);
        return profile2;
    }

    @Override
    public boolean deleteProfile(int id) {
        this.profileRepository.deleteById(id);
        return true;
    }

    @Override
    public double getByname(String name) {
        Profile profile = profileRepository.findByName(name);
        return profile.getCost();
    }

    @Override
    public Chapter getCurrentChapter(String username, int bookId) throws ParseException {
        Profile profile = profileRepository.findByName(username);
        List<Chapter> chapters = profile.getChapterRelease();
        int i = 0;
        boolean flag = false;
        for (Chapter chapter : chapters) {
            if (bookId == chapter.getBookId()) {
                flag = true;
                if (chapter.isReleaseNext()) {
                    Date date = Calendar.getInstance().getTime();
                    DateFormat dateFormat = new SimpleDateFormat("mm-dd-yyyy hh:mm:ss");
                    String strDate = dateFormat.format(date);
                    date = dateFormat.parse(strDate);
                    System.out.println("currenttime:"+date);

                    Date date1=chapter.getDate();
                    DateFormat dateFormat1 = new SimpleDateFormat("mm-dd-yyyy hh:mm:ss");
                    String endDate = dateFormat1.format(date1);
                    date1= dateFormat1.parse(endDate);
                    System.out.println("starttime:"+date1);
                    long diff = date.getTime() - date1.getTime();
                    System.out.println("diif:"+diff);
                    long diffDays = diff / (24 * 60 * 60 * 1000);
                    System.out.println("days:"+diffDays);
                    long diffMinutes = diff / (60 * 1000) % 60;
                    System.out.println("diffMin:"+diffMinutes);
                    long diffSeconds = diff / 1000 % 60;
                    System.out.println("diffSeconds:"+diffSeconds);
                    if (diffSeconds >= 30) {
                        chapters.get(i).setChapterIndex(chapter.getChapterIndex() + 1);
                        chapters.get(i).setReleaseNext(false);
                        chapters.get(i).setDate(null);
                        profile.setChapterRelease(chapters);
                        profileRepository.save(profile);
                        return chapters.get(i);
                    } else {
                        return chapter;
                    }
                } else {
                    return chapter;
                }
            }
            i++;
        }
        if (!flag) {
            Chapter chapter = new Chapter();
            chapter.setBookId(bookId);
            chapter.setChapterIndex(1);
            chapters.add(chapter);
            profile.setChapterRelease(chapters);
            profileRepository.save(profile);
            return chapter;
        }
        return null;
    }

    @Override
    public Chapter updateReleaseNext(String username, int bookId) {
        Profile profile = profileRepository.findByName(username);
        List<Chapter> chapters = profile.getChapterRelease();
        int i = 0;
        for (Chapter chapter : chapters) {
            if (bookId == chapter.getBookId()) {
                Date dateobj = new Date();
                chapters.get(i).setReleaseNext(true);
                Date date = Calendar.getInstance().getTime();
                chapters.get(i).setDate(date);
                profile.setChapterRelease(chapters);
                profileRepository.save(profile);
                return chapters.get(i);
            }
            i++;
        }
        return null;
    }

    @Override
    public List<Profile> getByRole(String role) {
        List<Profile> profile = profileRepository.findByRole(role);
        return profile;
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
