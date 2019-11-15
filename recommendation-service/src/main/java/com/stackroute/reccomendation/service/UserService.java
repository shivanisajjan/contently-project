package com.stackroute.reccomendation.service;


import com.stackroute.reccomendation.domain.*;
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

public Collection<Book> bookReccomendation(String name)
{
    return userRepository.bookReccomendation(name);
}





    public Collection<User> getAll() {
        return (Collection<User>) userRepository.findAll();
    }


public Collection<Book> getRecAccProfile(String name)
{
    return userRepository.getRecAccProfile(name);
}

public Collection<Book> getRecAccAuth(String name)
{
    return userRepository.getRecAccAuth(name);
}

public Collection<Book> getTrending()
{
    return userRepository.getTrending();
}

public Collection<User> getIllustratorRec(String genre)
{
    return userRepository.getIllustratorRec(genre);
}

    public Collection<User> getEditorRec(String genre)
    {
        return userRepository.getEditorRec(genre);
    }

    public int getPriceRec(PriceRec priceRec)
    {
        int count=1;
         count=userRepository.getPriceRec(priceRec.getGenre()).size();
         if(count<=0)
             count=1;

        int price=priceRec.getEditorPay()+priceRec.getIllustratorPay()+priceRec.getBase()+count/10+priceRec.getNoOfWords()/1000;
        System.out.println("price="+price);
        return price;
    }

    public void savePublication(String title,String author)
    {
        userRepository.savePublication(title,author);

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


