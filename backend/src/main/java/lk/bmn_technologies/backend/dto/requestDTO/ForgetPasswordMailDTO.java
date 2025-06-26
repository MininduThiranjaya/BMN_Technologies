package lk.bmn_technologies.backend.dto.requestDTO;

public class ForgetPasswordMailDTO {
    
    private String to;
    private String subject;
    private String body;

    public ForgetPasswordMailDTO(String body, String subject, String to) {
        this.body = body;
        this.subject = subject;
        this.to = to;
    }

    public String getTo() {
        return to;
    }
    public void setTo(String to) {
        this.to = to;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }

    
}
