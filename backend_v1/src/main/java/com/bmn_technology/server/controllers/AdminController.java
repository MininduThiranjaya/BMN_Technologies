package com.bmn_technology.server.controllers;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.bmn_technology.server.services.AdminService;
import com.bmn_technology.server.services.auth.AdminUserDetails;
import com.bmn_technology.server.DTO.req_dto.AdminReg_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.SolarAssessmentAssignment_req_dto;
import com.bmn_technology.server.DTO.ApiResponse;
import com.bmn_technology.server.DTO.req_dto.AdminChangePassword_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminLogin_req_dto;
import com.bmn_technology.server.DTO.res_dto.AdminLogin_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminReg_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminUserProfile_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullAdminDetails_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProduct_res_dto;
import com.bmn_technology.server.DTO.res_dto.SolarAssessmentAssignment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserTestimonial_res_dto;
import com.bmn_technology.server.models.ProductModel;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("bmn_tech/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService service;
    
    @PostMapping("register")
    public ResponseEntity<ApiResponse> adminRegisterController(@Valid @RequestBody AdminReg_req_dto data) {
        
        AdminReg_res_dto res = service.adminUserRegisterService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Admin user registered successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("login")
    public ResponseEntity<ApiResponse> adminLoginController(@Valid @RequestBody AdminLogin_req_dto data) {
        
        AdminLogin_res_dto res = service.adminUserLoginService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Admin user logedin successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/me")
    public ResponseEntity<ApiResponse> getCurrentUserDetailsController(@AuthenticationPrincipal AdminUserDetails currentUser) {
        
        AdminUserProfile_res_dto res = service.getCurrentAdminUserDetailsService(currentUser.getUsername());
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Admin user details fetch successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("auth/user-solar-assessment/get-all-assessment")
    public ResponseEntity<ApiResponse> getAllUserSolarAssessmentController() {
        
        List<UserSolarAssessment_res_dto> res = service.getAllUserSolarAssessmentService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User solar assessment fetch successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("auth/user-solar-assessment/mark-as-read")
    public ResponseEntity<ApiResponse> userSolarAssessmentMarkAsReadController(@RequestBody Map<String, Long> body) {
        
        long id  = body.get("id");
        UserSolarAssessment_res_dto res = service.userSolarAssessmentMarkAsReadService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User solar assessment mark as read successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("auth/user-solar-assessment/assign")
    public ResponseEntity<ApiResponse> userSolarAssessmentAssignController(@Valid @RequestBody SolarAssessmentAssignment_req_dto data) {
        
        SolarAssessmentAssignment_res_dto res = service.userSolarAssessmentAssignService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User solar assessment assigned successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("auth/password/change-password")
    public ResponseEntity<ApiResponse> adminPasswordChangeController(@RequestBody AdminChangePassword_req_dto data) {
        
        AdminUserProfile_res_dto res = service.adminPasswordChangeService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User changed password successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/get-all-admins")
    public ResponseEntity<ApiResponse> getAllAdminUserConroller() {

        List<FullAdminDetails_res_dto> res = service.getAllAdminUserService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User suspend successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("auth/set-suspention/{id}")
    public ResponseEntity<ApiResponse> makeAdminUserSuspendController(@PathVariable("id") long id) {
        
        AdminUserProfile_res_dto res = service.makeAdminUserSuspendService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User suspend successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("auth/change-role/{id}")
    public ResponseEntity<ApiResponse> changeAdminUserRoleController(@PathVariable("id") long id) {
        
        AdminUserProfile_res_dto res = service.changeAdminUserRoleService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User role changed successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);   
    }

    @DeleteMapping("auth/delete/{id}")
    public ResponseEntity<ApiResponse> adminUserDeleteController(@PathVariable("id") long id) {
        
        AdminUserProfile_res_dto res = service.adminUserDeleteService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User deleted successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response); 
    }

    @GetMapping("auth/testimonial/count")
    public ResponseEntity<ApiResponse> countUserTestimonialController() {
        
        long res = service.countUserTestimonialService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User testimonial count get successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("auth/testimonila/change-state")
    public ResponseEntity<ApiResponse> changeTestimonialIsAvailableStateContoller(@RequestBody Map<String, Long> body) {
        
        long id  = body.get("id");
        UserTestimonial_res_dto res = service.changeTestimonialIsAvailableStateService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Change user testimonial available state successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/testimonial/get-all")
    public ResponseEntity<ApiResponse> getAllUserTestimonialController() {
        
        List<UserTestimonial_res_dto> res = service.getAllUserTestimonialService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("All User testimonial fetch successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("auth/add-product")
    public ResponseEntity<ApiResponse> addNewProductController(@RequestBody ProductCreate_req_dto data) {
        
        FullProduct_res_dto res = service.addNewProductService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("All User testimonial fetch successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // @PutMapping("/edit/{id}")
    // public void editProductInDatabase(@PathVariable("id") long id, @RequestBody ProductModel data) {
    //     service.editProduct(id, data);
    // }

    // @GetMapping("/get/{category}")
    // public List<ProductDTO> getProductsFromDatabase(@PathVariable("category") String category) {
    //     return service.getProduct(category);
    // }
    
    // @PostMapping("/get/filter")
    // public List<ProductModel> getFilteredProductsFromDatabase(@RequestBody ProductFilterDTO filters) {
    //     return service.getFilteredProduct(filters);
    // }

    // @GetMapping("/count")
    // public long countProductsInDatabase() {
    //     return service.countProducts();
    // }

    // @GetMapping("/get/all")
    // public List<ProductModel> getProductWithAllDetailsFromDatabase() {
    //     return service.getProductWithAllDetails();
    // }

    // @DeleteMapping("/delete-by-id/{id}")
    // public ResponseEntity<ApiResponseDTO> deleteProductFromDatabase(@PathVariable("id") long id) {
    //     try{
    //         ApiResponseDTO response = service.deleteProduct(id);
    //         return ResponseEntity.ok(response);
    //     }
    //     catch(Exception e) {
    //         return ResponseEntity
    //             .status(500)
    //             .body(new ApiResponseDTO(false, "Error deleting product: " + e.getMessage()));
    //     }
    // }

}
