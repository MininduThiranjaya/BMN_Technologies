package com.bmn_technology.server.error.exception;

public class UserNotFoundExc extends RuntimeException {
    
    public UserNotFoundExc(String nic) {
        
        super("User not found: " + nic);
    }

    public UserNotFoundExc(String reason, long id) {
        
        super(reason + id);
    }
}
