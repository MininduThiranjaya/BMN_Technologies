package com.bmn_technology.server.error.exception;

public class UserNotUpdatedExc extends RuntimeException {
    
    public UserNotUpdatedExc(String email, String reason) {
        
        super("User with NIC: " + email + " could not be updated: " + reason);
    }

    public UserNotUpdatedExc(String reason) {
        
        super(reason);
    }
}
