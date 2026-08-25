package com.bmn_technology.server.error.exception;

public class BadCredentialsExc extends RuntimeException{
    
    private final String code;
    public BadCredentialsExc(String code, String message) {
        super(message);
        this.code = code;
    }
    public String getCode() {
        return code;
    }
}
