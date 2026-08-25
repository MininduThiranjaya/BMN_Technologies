package com.bmn_technology.server.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.bmn_technology.server.DTO.req_dto.ForgetPasswordSendMail_req_dto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public boolean sendEmail(ForgetPasswordSendMail_req_dto data) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("thiranjaya.work@gmail.com");
            message.setTo(data.getTo());
            message.setSubject(data.getSubject());
            message.setText(data.getBody());
            mailSender.send(message);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }
}
