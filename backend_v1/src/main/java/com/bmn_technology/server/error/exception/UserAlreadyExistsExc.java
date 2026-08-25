package com.bmn_technology.server.error.exception;

public class UserAlreadyExistsExc extends RuntimeException{
    
    public UserAlreadyExistsExc(String nic) {
        
        super("User already exists: " + nic);
    }
}
