package lk.bmn_technologies.backend.dto.responseDTO;

public class AuthResponseDTO {

    private String token;
    private long expiresIn;
    private boolean success;
    private Object user;
    private String role;

    
    public AuthResponseDTO(String token, long expiresIn, Object user, String role, boolean success) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.user = user;
        this.role = role;
        this.success = success;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }
    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public boolean issuccess() {
        return success;
    }

    public void setsuccess(boolean success) {
        this.success = success;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
