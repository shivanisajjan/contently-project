package com.stackroute.usermanagement.exceptions;


import com.stackroute.usermanagement.model.AuthenticationResponse;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsExceptions.class)
    public ResponseEntity<?> handleAlreadyExistsException(HttpServletRequest request, Exception ex){
        return new ResponseEntity<String>("Username Already Exists", HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<?> handleUserDoesNotException(HttpServletRequest request, Exception ex){
        return new ResponseEntity<String>("User Does Not Exist", HttpStatus.CONFLICT);
    }
    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<?> handleInternalServerErrorException(HttpServletRequest request, Exception ex){
        return new ResponseEntity<String>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(InvalidCredentialException.class)
    public ResponseEntity<?> handleInvalidCredentialException(HttpServletRequest request, Exception ex){
        AuthenticationResponse a=new AuthenticationResponse();
        a.setAuthResponse("Username/Password is invalid");
        return new ResponseEntity<AuthenticationResponse>(a, HttpStatus.OK);
    }
}
