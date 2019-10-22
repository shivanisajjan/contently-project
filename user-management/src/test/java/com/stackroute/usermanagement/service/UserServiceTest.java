package com.stackroute.usermanagement.service;

import com.stackroute.usermanagement.exceptions.InvalidCredentialException;
import com.stackroute.usermanagement.exceptions.NullValueFieldException;
import com.stackroute.usermanagement.exceptions.UserAlreadyExistsExceptions;
import com.stackroute.usermanagement.exceptions.InternalServerErrorException;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    User user;

    //Create a mock for UserRepository
    @Mock
    UserRepository userRepository;

    //Inject the mocks as dependencies into UserServiceImpl
    @InjectMocks
    UserServiceImpl userService;

    @Before
    public void setUp(){
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);
        user = new User();
        user.setId(15L);
        user.setUsername("Shivani");
    }

    @Test
    public void saveUserTestSuccess() throws UserAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {

        when(userRepository.save(any())).thenReturn(user);
        User savedUser = userService.saveUser(user);
        Assert.assertEquals(user,savedUser);
        //verify here verifies that userRepository save method is only called once
        verify(userRepository,times(1)).save(user);
      
    }

    @Test(expected = UserAlreadyExistsExceptions.class)
    public void saveUserTestFailure() throws UserAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {
        when(userRepository.save(any())).thenReturn(null);
        User savedUser = userService.saveUser(user);
//        System.out.println("savedUser" + savedUser);
        //Assert.assertEquals(user,savedUser);

    }
    @Test(expected = UserAlreadyExistsExceptions.class)
    public void saveUserTestFailure1() throws UserAlreadyExistsExceptions, InternalServerErrorException, NullValueFieldException {
        User savedUser = userService.saveUser(user);
        doThrow(new UserAlreadyExistsExceptions()).when(userRepository).findById(eq(15L));
    }

    @Test
    public void getUserByUsernameTestSuccess() throws InternalServerErrorException, InvalidCredentialException {
        when(userRepository.findByUsername(any())).thenReturn(user);
        User getUser = userService.findByUsername(user);
        Assert.assertEquals(user,getUser);
        //verify here verifies that userRepository save method is only called once
        verify(userRepository,times(1)).findByUsername("Shivani");
    }
}
