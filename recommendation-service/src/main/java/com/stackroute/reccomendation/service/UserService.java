package com.stackroute.reccomendation.service;


import com.stackroute.reccomendation.domain.Book;
import com.stackroute.reccomendation.domain.Editor;
import com.stackroute.reccomendation.domain.User;
import com.stackroute.reccomendation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserService {

    @Autowired
UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user)
    {
        userRepository.save(user);
        return user;
    }
    public Collection<User> getAll(String name)
{

    return (Collection<User>) userRepository.findAll();
}

public Collection<Book> getBookRec(String name)
{
    return userRepository.bookReccomendation(name);
}

public int getBookPriceRec(String genre)
{

    return userRepository.getBookPriceRec(genre);
}


public Collection<Editor> getEditorRec(String genre)
{
    return userRepository.getEditorRec(genre);
}

public Collection<Book> getIdRec(int id)
    {
        return userRepository.getIdRec(id);
    }

    public Collection<User> getAll() {
        return (Collection<User>) userRepository.findAll();
    }


public Collection<Book> getRecAccProfile(User user)
{
    return userRepository.getRecAccProfile(user.getAgeGroup(),user.getGender());
}



    public void dop() {
        userRepository.dop();
    }
    public void pop() {
        userRepository.pop();
    }
    public void bob() {
        userRepository.bob();
    }

}


