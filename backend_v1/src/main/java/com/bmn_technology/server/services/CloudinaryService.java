package com.bmn_technology.server.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bmn_technology.server.DTO.res_dto.CloudinaryUpload_res_dto;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CloudinaryService {
    
    private final Cloudinary cloudinary;

    public CloudinaryUpload_res_dto uploadImageService(MultipartFile file, String destination) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Image file is empty");
        }
        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", destination,
                            "resource_type", "image"));
            return CloudinaryUpload_res_dto.builder()
                    .publicId(result.get("public_id").toString())
                    .imageUrl(result.get("secure_url").toString())
                    .build();

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to upload image to Cloudinary", e);
        }
    }

    // public Map<String, Boolean> deleteImagesFromCloudinary(List<String> imagePublicIdList) {

    //     return imagePublicIdList.parallelStream()
    //             .collect(Collectors.toConcurrentMap(
    //                     publicId -> publicId,
    //                     publicId -> {
    //                         try {
    //                             Map result = cloudinaryConfig.cloudinary().uploader().destroy(publicId,
    //                                     ObjectUtils.emptyMap());
    //                             Object status = result.get("result");
    //                             return "ok".equals(status); // Cloudinary returns { result: "ok" } if successful
    //                         } catch (Exception e) {
    //                             System.err.println("Failed to delete: " + publicId);
    //                             return false;
    //                         }
    //                     }));
    // }

}
