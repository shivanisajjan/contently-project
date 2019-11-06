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
            User userTemp = userRepository.save(user);
            return userTemp;
        }catch (Exception e){
            throw new InternalServerErrorException();
        }

    }
    @Override
    public User findByUsername(User user) throws InternalServerErrorException, InvalidCredentialException {
        User userTemp;
        try {
            userTemp = userRepository.findByUsername(user.getUsername());
        }
        catch(Exception ex){
            throw new InternalServerErrorException();
        }
        if(userTemp==null || !BCrypt.checkpw(user.getPassword(),userTemp.getPassword())){
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
        User userTemp=userRepository.findByUsername(user.getUsername());
        if(userTemp!= null){
            try{
                user.setId(userTemp.getId());
                User user1=userRepository.save(user);
                return user1;
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
