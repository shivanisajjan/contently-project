package com.stackroute.profileservice.service;

//import com.stackroute.profileservice.exceptions.MovieExistsByIdGlobalException;
//import com.stackroute.profileservice.exceptions.MovieNotFoundGlobalException;
import com.stackroute.profileservice.model.Chapter;
import com.stackroute.profileservice.model.Profile;
import java.util.List;

public interface ProfileService {

    public Profile saveProfile(Profile profile);
    public List<Profile> getallProfile();
    public Profile update(Profile profile);
    public boolean deleteProfile(int id);
    public double getByname(String name);
    public Profile updateChapter(String username,Chapter chapter);
    public int getNextSequence(String seqName);
}
