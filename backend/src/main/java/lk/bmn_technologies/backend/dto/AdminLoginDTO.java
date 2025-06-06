package lk.bmn_technologies.backend.dto;

public class AdminLoginDTO {
    
    private String username;
    private String password;

    public AdminLoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
