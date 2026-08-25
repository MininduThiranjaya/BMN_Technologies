package com.bmn_technology.server.DTO.req_dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForgetPasswordSendMail_req_dto {

    @Email(message = "Use a valid email")
    @NotBlank(message = "Mail to address is required")
    private String to;
    @NotBlank(message = "Mail subject is required")
    private String subject;
    @NotBlank(message = "Mail subject is required")
    private String body;
}
