package com.stackroute.usermanagement.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.usermanagement.exceptions.GlobalExceptionHandler;
import com.stackroute.usermanagement.exceptions.InternalServerErrorException;
import com.stackroute.usermanagement.exceptions.UserAlreadyExistsExceptions;
import com.stackroute.usermanagement.model.User;
import com.stackroute.usermanagement.service.RabbitMQSender;
import com.stackroute.usermanagement.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mindrot.jbcrypt.BCrypt;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    private User user;
    @MockBean
    private UserService userService;
    @MockBean
    private RabbitMQSender rabbitMQSender;
    @InjectMocks
    private UserController userController;

    private List<User> list =null;

    @Before
    public void setUp(){

        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).setControllerAdvice(new GlobalExceptionHandler()).build();
        user = new User();
        user.setId(26L);
        user.setUsername("shivani");
        user.setPassword(BCrypt.hashpw("shivani", BCrypt.gensalt()));
        list = new ArrayList();
        list.add(user);
    }

    @Test
    public void userRegistry() throws Exception {
        when(userService.saveUser(any())).thenReturn(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/register")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }
      @Test
     public void userRegistryFailure() throws Exception {
        when(userService.saveUser(any())).thenThrow(UserAlreadyExistsExceptions.class);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/register")
        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }
    @Test
    public void userLogin() throws Exception {
        when(userService.findByUsername(any())).thenReturn(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isAccepted())
                .andDo(MockMvcResultHandlers.print());
    }
    @Test
    public void userLoginFailure() throws Exception {
        when(userService.findByUsername(any())).thenThrow(InternalServerErrorException.class);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andDo(MockMvcResultHandlers.print());
    }
    private static String asJsonString(final Object obj)
    {
        try{
            return new ObjectMapper().writeValueAsString(obj);

        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }










}
