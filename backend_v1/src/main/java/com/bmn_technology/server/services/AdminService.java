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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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
public class AdminService {

        private final AdminRepo adminRepo;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final SolarAssessmentRepo solarAssessmentRepo;
        private final SolarAssessmentAssignmentRepo solarAssessmentAssignmentRepo;
        private final UserTestimonialRepo testimonialRepo;
        private final ProductRepo productRepo;
        private final CloudinaryService cloudinaryService;
        private final ProjectRepo projectRepo;

        // admin user associate services
        public AdminReg_res_dto adminUserRegisterService(AdminReg_req_dto data) {

                if (adminRepo.existsByEmail(data.getEmail())) {
                        throw new UserAlreadyExistsExc(data.getEmail());
                }

                AdminModel admin = AdminModel.builder()
                                .userName(data.getUserName())
                                .password(passwordEncoder.encode(data.getPassword()))
                                .email(data.getEmail())
                                .phoneNumber(data.getPhoneNumber())
                                .role(data.getRole())
                                .build();

                adminRepo.save(admin);

                return AdminReg_res_dto.builder()
                                .userName(admin.getUserName())
                                .email(admin.getEmail())
                                .role(admin.getRole())
                                .phone(admin.getPhoneNumber())
                                .build();
        }

        public AdminLogin_res_dto adminUserLoginService(AdminLogin_req_dto data) {

                try {
                        UserDetails userDetails = jwtService.authenticate(data.getEmail(), data.getPassword());
                        System.out.println(userDetails);
                        String token = jwtService.generateToken(userDetails);
                        return new AdminLogin_res_dto(token);
                } catch (BadCredentialsException exception) {
                        throw new BadCredentialsExc("INVALID_CREDENTIALS", "Invalid NIC or password");
                }
        }

        @Transactional(readOnly = true)
        public AdminUserProfile_res_dto getCurrentAdminUserDetailsService(String email) throws BadCredentialsExc {

                AdminModel adminUser = adminRepo.findByEmail(email)
                                .orElseThrow(() -> new BadCredentialsExc("USER_NOT_FOUND", "User not found: " + email));
                return AdminUserProfile_res_dto.builder()
                                .userName(adminUser.getUserName())
                                .email(adminUser.getEmail())
                                .phoneNumber(adminUser.getPhoneNumber())
                                .role(adminUser.getRole())
                                .isSuspended(adminUser.isSuspended())
                                .lastLogin(adminUser.getLastLogin())
                                .createdAt(adminUser.getCreatedAt())
                                .updatedAt(adminUser.getUpdatedAt())
                                .build();
        }

        public List<UserSolarAssessment_res_dto> getAllUserSolarAssessmentService() {

                List<UserSolarAssessment_res_dto> allAssessment = solarAssessmentRepo.findAll()
                                .stream()
                                .map(assessment -> UserSolarAssessment_res_dto.builder()
                                                .id(assessment.getId())
                                                .userName(assessment.getUserName())
                                                .phoneNumber(assessment.getPhoneNumber())
                                                .email(assessment.getEmail())
                                                .location(assessment.getLocation())
                                                .propertyType(assessment.getPropertyType())
                                                .monthlyElectricityBill(assessment.getMonthlyElectricityBill())
                                                .interestedSolution(assessment.getInterestedSolution())
                                                .message(assessment.getMessage())
                                                .isRead(assessment.isRead())
                                                .createdAt(assessment.getCreatedAt())
                                                .updatedAt(assessment.getUpdatedAt())
                                                .build())
                                .toList();
                return allAssessment;
        }

        public UserSolarAssessment_res_dto userSolarAssessmentMarkAsReadService(long id) {

                SolarAssessment assessment = solarAssessmentRepo.findById(id)
                                .orElseThrow(() -> new UserNotFoundExc("User assesment not found id: ", id));
                assessment.setRead(!assessment.isRead());
                SolarAssessment savedAssessment = solarAssessmentRepo.save(assessment);
                UserSolarAssessment_res_dto response = UserSolarAssessment_res_dto.builder()
                                .id(savedAssessment.getId())
                                .userName(savedAssessment.getUserName())
                                .phoneNumber(savedAssessment.getPhoneNumber())
                                .email(savedAssessment.getEmail())
                                .location(savedAssessment.getLocation())
                                .propertyType(savedAssessment.getPropertyType())
                                .monthlyElectricityBill(savedAssessment.getMonthlyElectricityBill())
                                .interestedSolution(savedAssessment.getInterestedSolution())
                                .message(savedAssessment.getMessage())
                                .isRead(savedAssessment.isRead())
                                .createdAt(savedAssessment.getCreatedAt())
                                .updatedAt(savedAssessment.getUpdatedAt())
                                .build();
                return response;
        }

        public SolarAssessmentAssignment_res_dto userSolarAssessmentAssignService(
                        SolarAssessmentAssignment_req_dto data) {

                // Get currently logged-in admin from JWT
                Authentication authentication = SecurityContextHolder
                                .getContext()
                                .getAuthentication();
                String email = authentication.getName();
                // Admin who is assigning
                AdminModel assignedBy = adminRepo.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Assigning admin not found"));
                // Assessment being assigned
                SolarAssessment assessment = solarAssessmentRepo
                                .findById(data.getSolarAssessmentId())
                                .orElseThrow(() -> new RuntimeException("Solar assessment not found"));
                // Admin receiving the assessment
                AdminModel assignedTo = adminRepo
                                .findByIdAndRole(
                                                data.getAssignedToAdminId(),
                                                AdminRoles.admin)
                                .orElseThrow(() -> new RuntimeException("Assigned admin not found"));
                // Create assignment
                SolarAssessmentAssignment assignment = SolarAssessmentAssignment.builder()
                                .solarAssessment(assessment)
                                .assignedBy(assignedBy)
                                .assignedTo(assignedTo)
                                .note(data.getNote())
                                .isActive(true)
                                .build();
                // Save
                SolarAssessmentAssignment savedAssignment = solarAssessmentAssignmentRepo.save(assignment);
                // Return the saved assignment
                return SolarAssessmentAssignment_res_dto.builder()
                                .id(savedAssignment.getId())
                                .solarAssessmentId(savedAssignment.getSolarAssessment().getId())
                                .solarAssessmentUserName(savedAssignment.getSolarAssessment().getUserName())
                                .assignedByAdminId(savedAssignment.getAssignedBy().getId())
                                .assignedByAdminUserName(savedAssignment.getAssignedBy().getUserName())
                                .assignedToAdminId(savedAssignment.getAssignedTo().getId())
                                .assignedToAdminUserName(savedAssignment.getAssignedTo().getUserName())
                                .isActive(savedAssignment.isActive())
                                .note(savedAssignment.getNote())
                                .assignedAt(savedAssignment.getAssignedAt())
                                .build();
        }

        public AdminUserProfile_res_dto adminPasswordChangeService(AdminChangePassword_req_dto data) {

                Authentication authentication = SecurityContextHolder
                                .getContext()
                                .getAuthentication();
                String email = authentication.getName();
                AdminModel admin = adminRepo.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
                // Check current password
                if (!passwordEncoder.matches(
                                data.getCurrentPassword(),
                                admin.getPassword())) {
                        throw new RuntimeException(
                                        "Current password is incorrect");
                }
                // Check new password is different
                if (passwordEncoder.matches(
                                data.getNewPassword(),
                                admin.getPassword())) {
                        throw new RuntimeException(
                                        "New password must be different from current password");
                }
                // Encode new password
                String encodedPassword = passwordEncoder.encode(
                                data.getNewPassword());
                admin.setPassword(encodedPassword);
                try {
                        AdminModel updatedAdmin = adminRepo.save(admin);
                        return AdminUserProfile_res_dto.builder()
                                        .userName(updatedAdmin.getUserName())
                                        .email(updatedAdmin.getEmail())
                                        .phoneNumber(updatedAdmin.getPhoneNumber())
                                        .role(updatedAdmin.getRole())
                                        .isSuspended(updatedAdmin.isSuspended())
                                        .lastLogin(updatedAdmin.getLastLogin())
                                        .createdAt(updatedAdmin.getCreatedAt())
                                        .updatedAt(updatedAdmin.getUpdatedAt())
                                        .build();
                } catch (DataAccessException e) {
                        throw new UserNotUpdatedExc(
                                        "User password email: " + email + " updating error");
                }
        }

        public AdminUserProfile_res_dto makeAdminUserSuspendService(long id) {

                AdminModel admin = adminRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
                admin.setSuspended(!admin.isSuspended());
                try {
                        AdminModel updatedAdmin = adminRepo.save(admin);
                        return AdminUserProfile_res_dto.builder()
                                        .userName(updatedAdmin.getUserName())
                                        .email(updatedAdmin.getEmail())
                                        .phoneNumber(updatedAdmin.getPhoneNumber())
                                        .role(updatedAdmin.getRole())
                                        .isSuspended(updatedAdmin.isSuspended())
                                        .lastLogin(updatedAdmin.getLastLogin())
                                        .createdAt(updatedAdmin.getCreatedAt())
                                        .updatedAt(updatedAdmin.getUpdatedAt())
                                        .build();
                } catch (DataAccessException e) {
                        throw new UserNotUpdatedExc(
                                        "Make admin user suspention id: " + id + " updating error");
                }

        }

        public AdminUserProfile_res_dto changeAdminUserRoleService(long id) {

                AdminModel admin = adminRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
                if (admin.getRole() == AdminRoles.admin) {
                        admin.setRole(AdminRoles.super_admin);
                } else {
                        admin.setRole(AdminRoles.admin);
                }
                try {
                        AdminModel updatedAdmin = adminRepo.save(admin);
                        return AdminUserProfile_res_dto.builder()
                                        .userName(updatedAdmin.getUserName())
                                        .email(updatedAdmin.getEmail())
                                        .phoneNumber(updatedAdmin.getPhoneNumber())
                                        .role(updatedAdmin.getRole())
                                        .isSuspended(updatedAdmin.isSuspended())
                                        .lastLogin(updatedAdmin.getLastLogin())
                                        .createdAt(updatedAdmin.getCreatedAt())
                                        .updatedAt(updatedAdmin.getUpdatedAt())
                                        .build();
                } catch (DataAccessException e) {
                        throw new UserNotUpdatedExc(
                                        "Admin user role id: " + id + " updating error");
                }
        }

        public AdminUserProfile_res_dto adminUserDeleteService(long id) {

                AdminModel admin = adminRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
                adminRepo.delete(admin);
                return AdminUserProfile_res_dto.builder()
                                .userName(admin.getUserName())
                                .email(admin.getEmail())
                                .phoneNumber(admin.getPhoneNumber())
                                .role(admin.getRole())
                                .isSuspended(admin.isSuspended())
                                .lastLogin(admin.getLastLogin())
                                .createdAt(admin.getCreatedAt())
                                .updatedAt(admin.getUpdatedAt())
                                .build();
        }

        public UserTestimonial_res_dto changeTestimonialIsAvailableStateService(long id) {

                UserTestimonialModel tempResponse = testimonialRepo.findById(id)
                                .orElseThrow(() -> new UserNotFoundExc("User testimonial not found id: ", id));
                tempResponse.setAvailable(!tempResponse.isAvailable());
                try {
                        UserTestimonialModel updatedResponse = testimonialRepo.save(tempResponse);
                        return UserTestimonial_res_dto.builder()
                                        .id(updatedResponse.getId())
                                        .userName(updatedResponse.getUserName())
                                        .company(updatedResponse.getCompany())
                                        .position(updatedResponse.getPosition())
                                        .email(updatedResponse.getEmail())
                                        .testimonial(updatedResponse.getTestimonial())
                                        .rating(updatedResponse.getRating())
                                        .createdAt(updatedResponse.getCreatedAt())
                                        .isAvailable(updatedResponse.isAvailable())
                                        .build();
                } catch (DataAccessException e) {
                        throw new UserNotUpdatedExc(
                                        "User Testimonial id: " + id + " updating error");
                }
        }

        @Transactional(readOnly = true)
        public Page_res_dto<UserTestimonial_res_dto> getAllUserTestimonialService(
                        int page,
                        int size,
                        String sortBy,
                        String direction
        ) {

                if (page < 0) {
                        throw new IllegalArgumentException(
                                        "Page must be greater than or equal to 0");
                }
                if (size < 1 || size > 100) {
                        throw new IllegalArgumentException(
                                        "Size must be between 1 and 100");
                }
                Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
                Pageable pageable = PageRequest.of(
                        page,
                        size,
                        Sort.by(sortDirection, sortBy));
                Page<UserTestimonialModel> testimonials = testimonialRepo.findAll(pageable);
                Page<UserTestimonial_res_dto> mappedTestimonials = testimonials
                        .map(testimonial -> UserTestimonial_res_dto.builder()
                                .id(testimonial.getId())
                                .userName(testimonial.getUserName())
                                .company(testimonial.getCompany())
                                .position(testimonial.getPosition())
                                .email(testimonial.getEmail())
                                .testimonial(testimonial.getTestimonial())
                                .rating(testimonial.getRating())
                                .createdAt(testimonial.getCreatedAt())
                                .isAvailable(testimonial.isAvailable())
                                .build());

                return Page_res_dto.<UserTestimonial_res_dto>builder()
                        .items(mappedTestimonials.getContent())
                        .currentPage(mappedTestimonials.getNumber())
                        .pageSize(mappedTestimonials.getSize())
                        .totalItems(mappedTestimonials.getTotalElements())
                        .totalPages(mappedTestimonials.getTotalPages())
                        .build();
        }

        @Transactional(readOnly = true)
        public Page_res_dto<FullAdminDetails_res_dto> getAllAdminUserService(
                int page,
                int size,
                String sortBy,
                String direction
        ) {

                if (page < 0) {
                        throw new IllegalArgumentException("Page must be greater than or equal to 0");
                }
                if (size < 1 || size > 100) {
                        throw new IllegalArgumentException("Size must be between 1 and 100");
                }
                Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
                Pageable pageable = PageRequest.of(
                        page,
                        size,
                        Sort.by(sortDirection, sortBy));
                Page<AdminModel> admins = adminRepo.findAll(pageable);
                Page<FullAdminDetails_res_dto> mappedAdmins = admins.map(admin -> FullAdminDetails_res_dto.builder()
                        .id(admin.getId())
                        .userName(admin.getUserName())
                        .email(admin.getEmail())
                        .phoneNumber(admin.getPhoneNumber())
                        .role(admin.getRole())
                        .isSuspended(admin.isSuspended())
                        .lastLogin(admin.getLastLogin())
                        .createdAt(admin.getCreatedAt())
                        .updatedAt(admin.getUpdatedAt())
                        .build());
                return Page_res_dto.<FullAdminDetails_res_dto>builder()
                        .items(mappedAdmins.getContent())
                        .currentPage(mappedAdmins.getNumber())
                        .pageSize(mappedAdmins.getSize())
                        .totalItems(mappedAdmins.getTotalElements())
                        .totalPages(mappedAdmins.getTotalPages())
                        .build();
        }

        public FullProduct_res_dto addNewProductService(ProductCreate_req_dto data) {

                if (productRepo.findByProductId(data.getProductId())) {
                        throw new RuntimeException("Product ID already exists");
                }
                // Create product
                ProductModel product = ProductModel.builder()
                                .productId(data.getProductId())
                                .productName(data.getProductName())
                                .productDescription(data.getProductDescription())
                                .productPrice(data.getProductPrice())
                                .category(data.getCategory())
                                .build();
                // Upload images to Cloudinary
                List<ProductImageModel> productImages = new ArrayList<>();
                for (MultipartFile file : data.getImages()) {
                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(file,
                                        "bmn_technologies/products");
                        ProductImageModel productImage = ProductImageModel.builder()
                                        .imageUrl(uploadedImage.getImageUrl())
                                        .cloudinaryPublicId(uploadedImage.getPublicId())
                                        .product(product)
                                        .build();
                        productImages.add(productImage);
                }
                // Attach images to product
                product.setImages(productImages);
                // Save product and images
                // CascadeType.ALL will save the images as well
                ProductModel savedProduct = productRepo.save(product);
                // Convert to response DTO
                List<ProductImage_res_dto> imageResponses = savedProduct.getImages()
                                .stream()
                                .map(image -> ProductImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();
                return FullProduct_res_dto.builder()
                                .id(savedProduct.getId())
                                .productId(savedProduct.getProductId())
                                .productName(savedProduct.getProductName())
                                .productDescription(savedProduct.getProductDescription())
                                .productPrice(savedProduct.getProductPrice())
                                .category(savedProduct.getCategory())
                                .images(imageResponses)
                                .createdAt(savedProduct.getCreatedAt())
                                .updatedAt(savedProduct.getUpdatedAt())
                                .build();
        }

        public FullProject_res_dto addNewProjectService(ProjectCreate_req_dto data) {

                // Check duplicate Project ID
                if (projectRepo.findByProjectId(data.getProjectId())) {
                        throw new RuntimeException("Project ID already exists");
                }
                // Create project
                ProjectModel project = ProjectModel.builder()
                                .projectId(data.getProjectId())
                                .projectName(data.getProjectName())
                                .personName(data.getPersonName())
                                .province(data.getProvince())
                                .location(data.getLocation())
                                .projectDescription(data.getProjectDescription())
                                .category(data.getCategory())
                                .propertyType(data.getPropertyType())
                                .projectDate(data.getProjectDate())
                                .build();
                // Upload images to Cloudinary
                List<ProjectImageModel> projectImages = new ArrayList<>();
                for (MultipartFile file : data.getImages()) {
                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(
                                        file,
                                        "bmn_technologies/projects");
                        ProjectImageModel projectImage = ProjectImageModel.builder()
                                        .imageUrl(uploadedImage.getImageUrl())
                                        .cloudinaryPublicId(uploadedImage.getPublicId())
                                        .project(project)
                                        .build();

                        projectImages.add(projectImage);
                }
                // Attach images to project
                project.setImages(projectImages);
                // Save project and images
                // CascadeType.ALL saves the images as well
                ProjectModel savedProject = projectRepo.save(project);
                // Convert images to response DTO
                List<ProjectImage_res_dto> imageResponses = savedProject.getImages()
                                .stream()
                                .map(image -> ProjectImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();
                // Convert project to response DTO
                return FullProject_res_dto.builder()
                                .id(savedProject.getId())
                                .projectId(savedProject.getProjectId())
                                .projectName(savedProject.getProjectName())
                                .personName(savedProject.getPersonName())
                                .province(savedProject.getProvince())
                                .location(savedProject.getLocation())
                                .projectDescription(savedProject.getProjectDescription())
                                .category(savedProject.getCategory())
                                .propertyType(savedProject.getPropertyType())
                                .projectDate(savedProject.getProjectDate())
                                .images(imageResponses)
                                .createdAt(savedProject.getCreatedAt())
                                .updatedAt(savedProject.getUpdatedAt())
                                .build();
        }

        // get count of all
        public GetAllCount_res_dto getCountOfAllService() {

                long admin = adminRepo.count();
                long product = productRepo.count();
                long project = projectRepo.count();
                long testimonial = testimonialRepo.count();
                long assessment = solarAssessmentAssignmentRepo.count();

                return GetAllCount_res_dto.builder()
                                .adminUserCount(admin)
                                .productCount(product)
                                .projectCount(project)
                                .testimonialCount(testimonial)
                                .userSolarAssessmentCount(assessment)
                                .build();
        }
}
