package lk.bmn_technologies.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {
    
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dlm0qkimw",
            "api_key", "923616284985653",
            "api_secret", "8ieuhEi5738ImjucJhF3HFdlyM0"));
    }
}

