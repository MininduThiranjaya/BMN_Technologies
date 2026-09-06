package com.bmn_technology.server.services;

import java.util.*;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.bmn_technology.server.services.auth.JwtService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataAccessException;
import com.bmn_technology.server.DTO.res_dto.UserTestimonial_res_dto;
import com.bmn_technology.server.error.exception.UserNotFoundExc;
import com.bmn_technology.server.error.exception.UserNotUpdatedExc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bmn_technology.server.error.exception.BadCredentialsExc;
import com.bmn_technology.server.error.exception.UserAlreadyExistsExc;
import com.bmn_technology.server.error.exception.UserNotFoundExc;
import com.bmn_technology.server.error.exception.UserNotUpdatedExc;
import com.bmn_technology.server.models.AdminModel;
import com.bmn_technology.server.models.ProductImageModel;
import com.bmn_technology.server.models.ProductModel;
import com.bmn_technology.server.models.ProjectImageModel;
import com.bmn_technology.server.models.ProjectModel;
import com.bmn_technology.server.repos.AdminRepo;
import com.bmn_technology.server.repos.ProductRepo;
import com.bmn_technology.server.repos.ProjectRepo;
import com.bmn_technology.server.repos.SolarAssessmentAssignmentRepo;
import com.bmn_technology.server.DTO.req_dto.AdminReg_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.SolarAssessmentAssignment_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminChangePassword_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminLogin_req_dto;
import com.bmn_technology.server.DTO.res_dto.AdminReg_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminUserProfile_res_dto;
import com.bmn_technology.server.DTO.res_dto.CloudinaryUpload_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullAdminDetails_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProduct_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProject_res_dto;
import com.bmn_technology.server.DTO.res_dto.GetAllCount_res_dto;
import com.bmn_technology.server.DTO.res_dto.Page_res_dto;
import com.bmn_technology.server.DTO.res_dto.ProductImage_res_dto;
import com.bmn_technology.server.DTO.res_dto.ProjectImage_res_dto;
import com.bmn_technology.server.DTO.res_dto.SolarAssessmentAssignment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.enums.AdminRoles;
import com.bmn_technology.server.DTO.res_dto.AdminLogin_res_dto;
import com.bmn_technology.server.repos.SolarAssessmentRepo;
import com.bmn_technology.server.repos.UserTestimonialRepo;
import com.bmn_technology.server.models.SolarAssessment;
import com.bmn_technology.server.models.SolarAssessmentAssignment;
import com.bmn_technology.server.models.UserTestimonialModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final ProductRepo productRepo;
    private final ProjectRepo projectRepo;

    @Transactional(readOnly = true)
    public Page_res_dto<FullProduct_res_dto> getProductService(
        int page,
        int size,
        String sortBy,
        String direction
    ) {

        if (page < 0) {
            throw new IllegalArgumentException("Page must be greater than or equal to 0");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException( "Size must be between 1 and 100");
        }
        Sort.Direction sortDirection =
                "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );
        Page<ProductModel> products =
                productRepo.findByIsAvailableTrue(pageable);
        Page<FullProduct_res_dto> mappedProducts =
                products.map(this::mapToFullProductResponse);
        return Page_res_dto.<FullProduct_res_dto>builder()
                .items(mappedProducts.getContent())
                .currentPage(mappedProducts.getNumber())
                .pageSize(mappedProducts.getSize())
                .totalItems(mappedProducts.getTotalElements())
                .totalPages(mappedProducts.getTotalPages())
                .build();
    }

    private FullProduct_res_dto mapToFullProductResponse(ProductModel product) {

        List<ProductImage_res_dto> imageResponses =
                product.getImages()
                        .stream()
                        .map(image -> ProductImage_res_dto.builder()
                                .id(image.getId())
                                .imageUrl(image.getImageUrl())
                                .build())
                        .toList();
        return FullProduct_res_dto.builder()
            .id(product.getId())
            .productId(product.getProductId())
            .productName(product.getProductName())
            .productDescription(product.getProductDescription())
            .productPrice(product.getProductPrice())
            .category(product.getCategory())
            .images(imageResponses)
            .createdAt(product.getCreatedAt())
            .updatedAt(product.getUpdatedAt())
            .build();
    }

    @Transactional(readOnly = true)
    public Page_res_dto<FullProject_res_dto> getProjectService(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        if (page < 0) {
            throw new IllegalArgumentException(
                    "Page must be greater than or equal to 0"
            );
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "Size must be between 1 and 100"
            );
        }
        Sort.Direction sortDirection =
                "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );
        Page<ProjectModel> projects =
                projectRepo.findByIsAvailableTrue(pageable);
        Page<FullProject_res_dto> mappedProjects =
                projects.map(this::mapToFullProjectResponse);
        return Page_res_dto.<FullProject_res_dto>builder()
            .items(mappedProjects.getContent())
            .currentPage(mappedProjects.getNumber())
            .pageSize(mappedProjects.getSize())
            .totalItems(mappedProjects.getTotalElements())
            .totalPages(mappedProjects.getTotalPages())
            .build();
    }

    private FullProject_res_dto mapToFullProjectResponse(ProjectModel project) {

        List<ProjectImage_res_dto> imageResponses =
                project.getImages()
                        .stream()
                        .map(image -> ProjectImage_res_dto.builder()
                                .id(image.getId())
                                .imageUrl(image.getImageUrl())
                                .build())
                        .toList();
        return FullProject_res_dto.builder()
            .id(project.getId())
            .projectId(project.getProjectId())
            .projectName(project.getProjectName())
            .personName(project.getPersonName())
            .province(project.getProvince())
            .location(project.getLocation())
            .projectDescription(project.getProjectDescription())
            .category(project.getCategory())
            .propertyType(project.getPropertyType())
            .projectDate(project.getProjectDate())
            .images(imageResponses)
            .createdAt(project.getCreatedAt())
            .updatedAt(project.getUpdatedAt())
            .build();
    }      
}
