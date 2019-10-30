package com.stackroute.usermanagement.service;


import com.stackroute.usermanagement.exceptions.*;
import com.stackroute.usermanagement.model.DTOUser;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private RabbitMQSender rabbitMQSender;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, RabbitMQSender rabbitMQSender) {
        this.userRepository = userRepository;
        this.rabbitMQSender = rabbitMQSender;
    }
    @Override
    public User saveUser(User user) throws UserAlreadyExistsExceptions,InternalServerErrorException {
        if(userRepository.findByUsername(user.getUsername())!=null){
            throw new UserAlreadyExistsExceptions();
        }
        try {
            User u = userRepository.save(user);
            return u;
        }catch (Exception e){
            throw new InternalServerErrorException();
        }

    }
    @Override
    public User findByUsername(User u) throws InternalServerErrorException, InvalidCredentialException {
        User user;
        try {
            user = userRepository.findByUsername(u.getUsername());
        }
        catch(Exception ex){
            throw new InternalServerErrorException();
        }
        if(user==null){
            throw new InvalidCredentialException();
        }
        if(!BCrypt.checkpw(u.getPassword(),user.getPassword())){
            throw new InvalidCredentialException();
        }
        return user;


    }

    @Override
    public User deleteUser(String username) throws UserDoesNotExistException, InternalServerErrorException {
        User user;
        try {
            user = userRepository.findByUsername(username);
        }catch (Exception e){
            throw new InternalServerErrorException();
        }
        if(user == null){
            throw new UserDoesNotExistException();
        }
        userRepository.delete(user);
        return user;
    }
    @Override
    public User updateUser(User user) throws UserDoesNotExistException,InternalServerErrorException{
        User u1=userRepository.findByUsername(user.getUsername());
        if(u1!= null){
            try{
                user.setId(u1.getId());
                User u=userRepository.save(user);
                return u;
            }
            catch (Exception ex){
                throw new InternalServerErrorException();
            }

        }
        else {
            throw new UserDoesNotExistException();
        }
    }
    @Override
    public User getByUsername(String Username){
        return userRepository.findByUsername(Username);
    }

}
