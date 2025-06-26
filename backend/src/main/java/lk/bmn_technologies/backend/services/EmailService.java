package lk.bmn_technologies.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.requestDTO.ForgetPasswordMailDTO;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public boolean sendEmail(ForgetPasswordMailDTO data) {
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
