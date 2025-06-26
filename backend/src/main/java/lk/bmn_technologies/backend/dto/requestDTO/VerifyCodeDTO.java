package lk.bmn_technologies.backend.dto.requestDTO;

public class VerifyCodeDTO {

    private String email;
    private String code;

    public VerifyCodeDTO(String code, String email) {
        this.code = code;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    
}
