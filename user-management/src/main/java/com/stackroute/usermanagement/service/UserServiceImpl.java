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

    public User saveUser(User user) throws UserAlreadyExistsExceptions,NullValueFieldException,InternalServerErrorException {
        if(user.getUsername() == null ||
           user.getPassword() == null ||
           user.getFirstName() == null ||
           user.getLastName() == null ||
           user.getEmail() == null ||
           user.getPhoneNumber() == null ||
           user.getNationality() == null ||
           user.getGender() == null
            ){
                throw new NullValueFieldException();
            }
        if(userRepository.findByUsername(user.getUsername())!=null){
            throw new UserAlreadyExistsExceptions();
        }
        try {
            User u = userRepository.save(user);
            DTOUser dtouser=new DTOUser();
            dtouser.setId(u.getId());
            System.out.println(u.getId());
            System.out.println(dtouser.getId());
            dtouser.setUsername(user.getUsername());
            dtouser.setRole(user.getRole());
            dtouser.setPhoneNumber(user.getPhoneNumber());
            dtouser.setNationality(user.getNationality());
            dtouser.setLastName(user.getLastName());
            dtouser.setGender(user.getGender());
            dtouser.setFirstName(user.getFirstName());
            dtouser.setEmail(user.getEmail());
            dtouser.setDob(user.getDob());
            dtouser.setAddressLine1(user.getAddressLine1());
            dtouser.setAddressLine2(user.getAddressLine2());
            dtouser.setAddressLine3(user.getAddressLine3());
            rabbitMQSender.sendRegistry(dtouser);
            return u;
        }catch (Exception e){
            throw new InternalServerErrorException();
        }

    }

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

    public User updateUser(User user) throws UserDoesNotExistException,InternalServerErrorException{
        if(userRepository.findByUsername(user.getUsername())!= null){
            try{
                return userRepository.save(user);
            }
            catch (Exception ex){
                throw new InternalServerErrorException();
            }

        }
        else {
            throw new UserDoesNotExistException();
        }
    }
}
