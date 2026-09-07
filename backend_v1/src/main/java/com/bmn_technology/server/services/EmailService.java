package com.bmn_technology.server.services;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.bmn_technology.server.DTO.req_dto.ForgetPasswordSendMail_req_dto;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public boolean sendEmail(ForgetPasswordSendMail_req_dto data) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("thiranjaya.work@gmail.com");
            helper.setTo(data.getTo());
            helper.setSubject(data.getSubject());
             // true = render body as HTML
            helper.setText(data.getBody(), true);
            mailSender.send(message);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }
}
