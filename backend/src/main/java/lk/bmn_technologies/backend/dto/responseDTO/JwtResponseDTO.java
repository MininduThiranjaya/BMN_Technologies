package lk.bmn_technologies.backend.dto.responseDTO;

public class JwtResponseDTO {
    
    private boolean success;
    private String message;
    private Object object;

    public JwtResponseDTO(String message, Object object, boolean success) {
        this.message = message;
        this.object = object;
        this.success = success;
    }
    
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Object getObject() {
        return object;
    }
    public void setObject(Object object) {
        this.object = object;
    }

    
}
