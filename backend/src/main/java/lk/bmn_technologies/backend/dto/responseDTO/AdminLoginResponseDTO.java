package lk.bmn_technologies.backend.dto.responseDTO;

import java.time.LocalDateTime;

public class AdminLoginResponseDTO {

    private String email;
    private String userName;
    private String role;
    private int phoneNumber;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isSuspended;

    public AdminLoginResponseDTO(String email, String userName, String role, int phoneNumber, LocalDateTime lastLogin, LocalDateTime updatedAt, LocalDateTime createdAt, boolean isSuspended) {
        this.email = email;
        this.userName = userName;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.lastLogin = lastLogin;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.isSuspended = isSuspended;
    }



    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public int getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public LocalDateTime getLastLogin() {
        return lastLogin;
    }
    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public boolean isSuspended() {
        return isSuspended;
    }
    public void setSuspended(boolean isSuspended) {
        this.isSuspended = isSuspended;
    }
}
