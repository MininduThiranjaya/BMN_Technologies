package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ForgetPasswordMailDTO;
import lk.bmn_technologies.backend.dto.requestDTO.VerifyCodeDTO;
import lk.bmn_technologies.backend.services.EmailService;
import lk.bmn_technologies.backend.services.VerificationCodeService;


@RestController
@RequestMapping("/api/verification-code")
public class VerificationCodeController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

     @PostMapping("forget-password/send-mail")
    public ResponseEntity<ApiResponseDTO> sendCode(@RequestBody ForgetPasswordMailDTO data) {
        String code = verificationCodeService.generateCode();
        verificationCodeService.storeCode(data.getTo(), code);
        data.setBody("""
                    We received a request to change the password for your account associated with this email address.\r
                    If you made this request, please use the code below to reset your password:\r"""
                    + code +"\r\n"+ 
                    "If you did not request a password change, please ignore this email or contact our support team immediately.\r\n"
                    + 
                    "Thank you,\r\n" +
                    "BMN Technologies.");
        boolean isSendMail = emailService.sendEmail(data);
        if(isSendMail) {
            return ResponseEntity.ok(new ApiResponseDTO(isSendMail, "Verification code send successfully to " + data.getTo()));
        }
        else {
            return ResponseEntity
                .status(401)
                .body(new ApiResponseDTO(false, "Failed send verification code"));
        }
    }

    @PostMapping("/check-code")
    public ResponseEntity<ApiResponseDTO> verifyCode(@RequestBody VerifyCodeDTO data) {
        boolean response = verificationCodeService.verifyCode(data.getEmail(), data.getCode());
        if(response) {
            return ResponseEntity.ok(new ApiResponseDTO(response, "Verifing code success"));
        }
        else {
            return ResponseEntity
                .status(401)
                .body(new ApiResponseDTO(false, "Failed verifing code"));
        }
    }

}
