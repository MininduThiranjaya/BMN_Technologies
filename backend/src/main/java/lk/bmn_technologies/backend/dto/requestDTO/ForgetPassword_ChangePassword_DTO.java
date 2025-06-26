package lk.bmn_technologies.backend.dto.requestDTO;

public class ForgetPassword_ChangePassword_DTO {

    private String email;
    private String newPassword;

    public ForgetPassword_ChangePassword_DTO(String email, String newPassword) {
        this.email = email;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
