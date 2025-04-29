package lk.bmn_technologies.backend.dto;

public class ApiResponseDTO {

    private boolean success;
    private String message;
    private Object object;

    public ApiResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponseDTO(boolean success, String message, Object object) {
        this.success = success;
        this.message = message;
        this.object = object;
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
