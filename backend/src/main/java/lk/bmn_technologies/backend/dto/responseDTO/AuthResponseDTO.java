package lk.bmn_technologies.backend.dto.responseDTO;

public class AuthResponseDTO {

    private String token;
    private long expiresIn;

    public AuthResponseDTO(String token, long expiresIn) {
        this.expiresIn = expiresIn;
        this.token = token;
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
}
