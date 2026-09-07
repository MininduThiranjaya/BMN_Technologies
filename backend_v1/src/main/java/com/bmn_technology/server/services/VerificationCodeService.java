package com.bmn_technology.server.services;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import com.bmn_technology.server.models.AdminModel;
import com.bmn_technology.server.repos.AdminRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VerificationCodeService {

    private final AdminRepo repo;

    private final Map<String, CodeData> codeStorage = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public boolean checkUserExist(String email){
        Optional<AdminModel> user = repo.findByEmail(email);
        return user.isPresent();
    }

    public String generateCode() {
        int code = 10000 + random.nextInt(90000);
        return String.valueOf(code);
    }

    public void storeCode(String email, String code) {
        codeStorage.put(email, new CodeData(code, Instant.now().plusSeconds(300))); // 5 min expiry
    }

    public boolean verifyCode(String email, String code) {
        CodeData stored = codeStorage.get(email);
        if (stored == null || Instant.now().isAfter(stored.expiry)) return false;
        return stored.code.equals(code);
    }

    private static class CodeData {
        String code;
        Instant expiry;

        CodeData(String code, Instant expiry) {
            this.code = code;
            this.expiry = expiry;
        }
    }
}
