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

import jakarta.validation.Valid;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataAccessException;

import com.bmn_technology.server.DTO.res_dto.UserTestimonial_res_dto;
import com.bmn_technology.server.error.exception.UserNotFoundExc;
import com.bmn_technology.server.error.exception.UserNotUpdatedExc;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

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
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordChange_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.SolarAssessmentAssignment_req_dto;
import com.bmn_technology.server.DTO.req_dto.VerifyCode_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminChangePassword_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminLogin_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductEdit_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectEdit_req_dto;
import com.bmn_technology.server.DTO.req_dto.ImageEdit_req_dto;
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordSendMail_req_dto;
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordGetMail_req_dto;
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
import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

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
        private final ObjectMapper objectMapper;
        private final EmailService mailService;
        private final VerificationCodeService verificationCodeService;

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

        public AdminReg_res_dto sendForgetPasswordSendMailService(
                        ForgetPasswordGetMail_req_dto data) {

                AdminModel admin = adminRepo.findByEmail(data.getMail())
                                .orElseThrow(() -> new RuntimeException("Admin account not found"));
                String verificationCode = verificationCodeService.generateCode();
                String emailBody = "<div style='font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;'>"
                                +
                                "<h2 style='color: #1a1a1a;'>Password Reset Request</h2>" +
                                "<p style='color: #444; font-size: 14px;'>Hello " + admin.getUserName()
                                + ", We received a request to reset the password for your account associated with this email address.</p>"
                                +
                                "<p style='color: #444; font-size: 14px;'>Use the code below to reset your password:</p>"
                                +
                                "<div style='background: #f4f4f4; padding: 14px; text-align: center; font-size: 22px; font-weight: bold; letter-spacing: 4px; border-radius: 6px; margin: 20px 0;'>"
                                +
                                verificationCode +
                                "</div>" +
                                "<p style='color: #888; font-size: 13px;'>This code will expire in 5 minutes.</p>" +
                                "<p style='color: #888; font-size: 13px;'>If you did not request this, you can safely ignore this email or contact our support team.</p>"
                                +
                                "<p style='color: #444; font-size: 14px; margin-top: 24px;'>Thank you,<br/>BMN Technologies</p>"
                                +
                                "</div>";
                verificationCodeService.storeCode(
                                admin.getEmail(),
                                verificationCode);
                ForgetPasswordSendMail_req_dto mailData = ForgetPasswordSendMail_req_dto.builder()
                                .to(admin.getEmail())
                                .subject("Password Reset Verification Code")
                                .body(emailBody)
                                .build();
                boolean isSent = mailService.sendEmail(mailData);
                if (!isSent) {
                        throw new RuntimeException(
                                        "Failed to send verification code email");
                }
                return AdminReg_res_dto.builder()
                                .userName(admin.getUserName())
                                .email(admin.getEmail())
                                .role(admin.getRole())
                                .phone(admin.getPhoneNumber())
                                .build();
        }

        public String verifyCodeService(@Valid @RequestBody VerifyCode_req_dto data) {

                boolean isValid = verificationCodeService.verifyCode(
                                data.getMail(),
                                data.getCode());
                if (!isValid) {
                        throw new RuntimeException(
                                        "Invalid or expired verification code");
                }
                return data.getCode();
        }

        public AdminReg_res_dto changeForgetPasswordService(
                        ForgetPasswordChange_req_dto data) {

                AdminModel admin = adminRepo.findByEmail(data.getMail())
                                .orElseThrow(() -> new RuntimeException("Admin account not found"));
                boolean isValidCode = verificationCodeService.verifyCode(
                                data.getMail(),
                                data.getCode());
                if (!isValidCode) {
                        throw new RuntimeException(
                                        "Invalid or expired verification code");
                }
                admin.setPassword(
                                passwordEncoder.encode(data.getNewPassword()));
                AdminModel savedAdmin = adminRepo.save(admin);
                verificationCodeService.removeCode(data.getMail());
                return AdminReg_res_dto.builder()
                                .userName(savedAdmin.getUserName())
                                .email(savedAdmin.getEmail())
                                .role(savedAdmin.getRole())
                                .phone(savedAdmin.getPhoneNumber())
                                .build();
        }

        @Transactional(readOnly = true)
        public Page_res_dto<FullAdminDetails_res_dto> getAllAdminUserService(
                        int page,
                        int size,
                        String sortBy,
                        String direction) {

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

        // solar associate services
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

        // testimonial associate services
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
                        String direction) {

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

        // product associate services
        public FullProduct_res_dto addNewProductService(ProductCreate_req_dto data) {

                if (productRepo.existsByProductId(data.getProductId())) {
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

        @Transactional
        public FullProduct_res_dto editProductService(
                        long id,
                        ProductEdit_req_dto data) {
                // Find product
                ProductModel product = productRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                // Update only fields actually sent by frontend
                if (data.getProductName() != null) {
                        product.setProductName(data.getProductName());
                }

                if (data.getProductDescription() != null) {
                        product.setProductDescription(data.getProductDescription());
                }

                if (data.getProductPrice() != null) {
                        product.setProductPrice(data.getProductPrice());
                }

                if (data.getCategory() != null) {
                        product.setCategory(data.getCategory());
                }
                // Parse image operations
                List<ImageEdit_req_dto> imageOperations = new ArrayList<>();
                if (data.getImageOperations() != null &&
                                !data.getImageOperations().isBlank()) {
                        try {
                                imageOperations = objectMapper.readValue(
                                                data.getImageOperations(),
                                                new TypeReference<List<ImageEdit_req_dto>>() {
                                                });
                        } catch (JacksonException e) {
                                throw new RuntimeException(
                                                "Invalid image operations format",
                                                e);
                        }
                }
                List<MultipartFile> uploadedFiles = data.getImages() != null
                                ? data.getImages()
                                : new ArrayList<>();
                int fileIndex = 0;
                // Process image operations
                for (ImageEdit_req_dto operation : imageOperations) {
                        String action = operation.getAction();
                        if (action == null) {
                                throw new RuntimeException("Image action cannot be null");
                        }
                        switch (action.toLowerCase()) {
                                // REMOVE EXISTING IMAGE
                                case "remove" -> {
                                        if (operation.getId() == null) {
                                                throw new RuntimeException(
                                                                "Image ID is required for remove operation");
                                        }
                                        ProductImageModel existingImage = product.getImages()
                                                        .stream()
                                                        .filter(image -> image.getId().equals(operation.getId()))
                                                        .findFirst()
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Product image not found: "
                                                                                        + operation.getId()));
                                        // Delete image from Cloudinary
                                        cloudinaryService.deleteImageService(
                                                        existingImage.getCloudinaryPublicId());
                                        // Remove from product image collection
                                        product.getImages().remove(existingImage);
                                }
                                // REPLACE EXISTING IMAGE
                                case "replace" -> {
                                        if (operation.getId() == null) {
                                                throw new RuntimeException(
                                                                "Image ID is required for replace operation");
                                        }
                                        if (fileIndex >= uploadedFiles.size()) {
                                                throw new RuntimeException(
                                                                "Replacement image file is missing");
                                        }
                                        ProductImageModel existingImage = product.getImages()
                                                        .stream()
                                                        .filter(image -> image.getId().equals(operation.getId()))
                                                        .findFirst()
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Product image not found: "
                                                                                        + operation.getId()));
                                        MultipartFile newFile = uploadedFiles.get(fileIndex++);
                                        // Delete old image from Cloudinary
                                        cloudinaryService.deleteImageService(
                                                        existingImage.getCloudinaryPublicId());
                                        // Upload replacement image
                                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(
                                                        newFile,
                                                        "bmn_technologies/products");
                                        // Update existing image record
                                        existingImage.setImageUrl(
                                                        uploadedImage.getImageUrl());
                                        existingImage.setCloudinaryPublicId(
                                                        uploadedImage.getPublicId());
                                }
                                // ADD NEW IMAGE
                                case "add" -> {
                                        if (fileIndex >= uploadedFiles.size()) {
                                                throw new RuntimeException(
                                                                "Image file is missing for add operation");
                                        }
                                        MultipartFile newFile = uploadedFiles.get(fileIndex++);
                                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(
                                                        newFile,
                                                        "bmn_technologies/products");
                                        ProductImageModel newImage = ProductImageModel.builder()
                                                        .imageUrl(
                                                                        uploadedImage.getImageUrl())
                                                        .cloudinaryPublicId(
                                                                        uploadedImage.getPublicId())
                                                        .product(product)
                                                        .build();

                                        product.getImages().add(newImage);
                                }
                                // INVALID ACTION
                                default -> throw new RuntimeException(
                                                "Invalid image action: " + action);
                        }
                }
                // Prevent extra files not associated with an operation
                if (fileIndex != uploadedFiles.size()) {
                        throw new RuntimeException(
                                        "Image files do not match image operations");
                }
                // Save product
                ProductModel savedProduct = productRepo.save(product);
                // Convert images to response DTO
                List<ProductImage_res_dto> imageResponses = savedProduct.getImages()
                                .stream()
                                .map(image -> ProductImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();
                // Build response
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

        public FullProduct_res_dto availabilitySwapProductService(long id) {

                if (!productRepo.existsById(id)) {
                        throw new UserNotFoundExc("Product not found id: ", id);
                }
                ProductModel product = productRepo.findById(id)
                                .orElseThrow(() -> new UserNotFoundExc("Product not found id: ", id));
                List<ProductImage_res_dto> imageResponses = product.getImages()
                                .stream()
                                .map(image -> ProductImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();
                product.setAvailable(!product.isAvailable());
                ProductModel savedProduct = productRepo.save(product);
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

        // project associate services
        public FullProject_res_dto addNewProjectService(ProjectCreate_req_dto data) {

                // Check duplicate Project ID
                if (projectRepo.existsByProjectId(data.getProjectId())) {
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

        @Transactional
        public FullProject_res_dto editProjectService(
                        long id,
                        ProjectEdit_req_dto data) {

                // Find project
                ProjectModel project = projectRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Project not found"));

                // Update only fields actually sent by frontend
                if (data.getProjectName() != null) {
                        project.setProjectName(data.getProjectName());
                }

                if (data.getPersonName() != null) {
                        project.setPersonName(data.getPersonName());
                }

                if (data.getProvince() != null) {
                        project.setProvince(data.getProvince());
                }

                if (data.getLocation() != null) {
                        project.setLocation(data.getLocation());
                }

                if (data.getProjectDescription() != null) {
                        project.setProjectDescription(data.getProjectDescription());
                }

                if (data.getCategory() != null) {
                        project.setCategory(data.getCategory());
                }

                if (data.getPropertyType() != null) {
                        project.setPropertyType(data.getPropertyType());
                }

                if (data.getProjectDate() != null) {
                        project.setProjectDate(data.getProjectDate());
                }

                // Parse image operations
                List<ImageEdit_req_dto> imageOperations = new ArrayList<>();

                if (data.getImageOperations() != null &&
                                !data.getImageOperations().isBlank()) {

                        try {

                                imageOperations = objectMapper.readValue(
                                                data.getImageOperations(),
                                                new TypeReference<List<ImageEdit_req_dto>>() {
                                                });

                        } catch (JacksonException e) {

                                throw new RuntimeException(
                                                "Invalid image operations format",
                                                e);
                        }
                }

                List<MultipartFile> uploadedFiles = data.getImages() != null
                                ? data.getImages()
                                : new ArrayList<>();

                int fileIndex = 0;

                // Process image operations
                for (ImageEdit_req_dto operation : imageOperations) {

                        String action = operation.getAction();

                        if (action == null) {
                                throw new RuntimeException(
                                                "Image action cannot be null");
                        }

                        switch (action.toLowerCase()) {

                                // REMOVE EXISTING IMAGE
                                case "remove" -> {

                                        if (operation.getId() == null) {
                                                throw new RuntimeException(
                                                                "Image ID is required for remove operation");
                                        }

                                        ProjectImageModel existingImage = project.getImages()
                                                        .stream()
                                                        .filter(image -> image.getId()
                                                                        .equals(operation.getId()))
                                                        .findFirst()
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Project image not found: "
                                                                                        + operation.getId()));

                                        // Delete image from Cloudinary
                                        cloudinaryService.deleteImageService(
                                                        existingImage.getCloudinaryPublicId());

                                        // Remove from project image collection
                                        project.getImages().remove(existingImage);
                                }

                                // REPLACE EXISTING IMAGE
                                case "replace" -> {

                                        if (operation.getId() == null) {
                                                throw new RuntimeException(
                                                                "Image ID is required for replace operation");
                                        }

                                        if (fileIndex >= uploadedFiles.size()) {
                                                throw new RuntimeException(
                                                                "Replacement image file is missing");
                                        }

                                        ProjectImageModel existingImage = project.getImages()
                                                        .stream()
                                                        .filter(image -> image.getId()
                                                                        .equals(operation.getId()))
                                                        .findFirst()
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Project image not found: "
                                                                                        + operation.getId()));

                                        MultipartFile newFile = uploadedFiles.get(fileIndex++);

                                        // Delete old image from Cloudinary
                                        cloudinaryService.deleteImageService(
                                                        existingImage.getCloudinaryPublicId());

                                        // Upload replacement image
                                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(
                                                        newFile,
                                                        "bmn_technologies/projects");

                                        // Update existing image record
                                        existingImage.setImageUrl(
                                                        uploadedImage.getImageUrl());

                                        existingImage.setCloudinaryPublicId(
                                                        uploadedImage.getPublicId());
                                }

                                // ADD NEW IMAGE
                                case "add" -> {

                                        if (fileIndex >= uploadedFiles.size()) {
                                                throw new RuntimeException(
                                                                "Image file is missing for add operation");
                                        }

                                        MultipartFile newFile = uploadedFiles.get(fileIndex++);

                                        CloudinaryUpload_res_dto uploadedImage = cloudinaryService.uploadImageService(
                                                        newFile,
                                                        "bmn_technologies/projects");

                                        ProjectImageModel newImage = ProjectImageModel.builder()
                                                        .imageUrl(
                                                                        uploadedImage.getImageUrl())
                                                        .cloudinaryPublicId(
                                                                        uploadedImage.getPublicId())
                                                        .project(project)
                                                        .build();

                                        project.getImages().add(newImage);
                                }

                                // INVALID ACTION
                                default -> throw new RuntimeException(
                                                "Invalid image action: " + action);
                        }
                }

                // Prevent extra files not associated with an operation
                if (fileIndex != uploadedFiles.size()) {
                        throw new RuntimeException(
                                        "Image files do not match image operations");
                }

                // Save project
                ProjectModel savedProject = projectRepo.save(project);

                // Convert images to response DTO
                List<ProjectImage_res_dto> imageResponses = savedProject.getImages()
                                .stream()
                                .map(image -> ProjectImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();

                // Build response
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

        public FullProject_res_dto availabilitySwapProjectService(long id) {

                if (!productRepo.existsById(id)) {
                        throw new UserNotFoundExc("Project not found id: ", id);
                }
                ProjectModel project = projectRepo.findById(id)
                                .orElseThrow(() -> new UserNotFoundExc("Project not found id: ", id));
                List<ProjectImage_res_dto> imageResponses = project.getImages()
                                .stream()
                                .map(image -> ProjectImage_res_dto.builder()
                                                .id(image.getId())
                                                .imageUrl(image.getImageUrl())
                                                .build())
                                .toList();
                project.setAvailable(!project.isAvailable());
                project = projectRepo.save(project);
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

        // get count of all
        public GetAllCount_res_dto getCountOfAllService() {

                long admin = adminRepo.count();
                long product = productRepo.countByIsAvailableTrue();
                long project = projectRepo.countByIsAvailableTrue();
                long testimonial = testimonialRepo.count();
                long assessment = solarAssessmentRepo.count();

                return GetAllCount_res_dto.builder()
                                .adminUserCount(admin)
                                .productCount(product)
                                .projectCount(project)
                                .testimonialCount(testimonial)
                                .userSolarAssessmentCount(assessment)
                                .build();
        }
}
