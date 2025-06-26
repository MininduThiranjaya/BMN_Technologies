package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.utils.ObjectUtils;

import lk.bmn_technologies.backend.config.CloudinaryConfig;

@Service
public class CloudinaryService {

    @Autowired
    private CloudinaryConfig cloudinaryConfig;

    public Map<String, Boolean> deleteImagesFromCloudinary(List<String> imagePublicIdList) {

        return imagePublicIdList.parallelStream()
        .collect(Collectors.toConcurrentMap(
            publicId -> publicId,
            publicId -> {
                try {
                    Map result = cloudinaryConfig.cloudinary().uploader().destroy(publicId, ObjectUtils.emptyMap());
                    Object status = result.get("result");
                    return "ok".equals(status); // Cloudinary returns { result: "ok" } if successful
                } catch (Exception e) {
                    System.err.println("Failed to delete: " + publicId);
                    return false;
                }
            }
        ));
    }
}
