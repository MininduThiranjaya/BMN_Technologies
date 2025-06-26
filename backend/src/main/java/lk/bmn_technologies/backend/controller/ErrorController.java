package lk.bmn_technologies.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseDTO> handleBadCredentialsException(BadCredentialsException e) {
        ApiResponseDTO response = new ApiResponseDTO(false, "User not authentiated");
        return ResponseEntity
            .status(401)
            .body(response);
    }
}
