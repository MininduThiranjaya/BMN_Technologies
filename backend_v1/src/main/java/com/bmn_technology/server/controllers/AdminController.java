package com.bmn_technology.server.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;

import com.bmn_technology.server.DTO.ApiResponse;
import com.bmn_technology.server.DTO.req_dto.AdminChangePassword_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminLogin_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminReg_req_dto;
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordChange_req_dto;
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordGetMail_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.SolarAssessmentAssignment_req_dto;
import com.bmn_technology.server.DTO.req_dto.VerifyCode_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductEdit_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectEdit_req_dto;
import com.bmn_technology.server.DTO.req_dto.ForgetPasswordSendMail_req_dto;
import com.bmn_technology.server.DTO.res_dto.AdminList_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminLogin_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminReg_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminUserProfile_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullAdminDetails_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProduct_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProject_res_dto;
import com.bmn_technology.server.DTO.res_dto.GetAllCount_res_dto;
import com.bmn_technology.server.DTO.res_dto.Page_res_dto;
import com.bmn_technology.server.DTO.res_dto.SolarAssessmentAssignment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserTestimonial_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminForAssignment_res_dto;
import com.bmn_technology.server.services.AdminService;
import com.bmn_technology.server.services.CommonService;
import com.bmn_technology.server.services.auth.AdminUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("bmn_tech/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService service;
    private final CommonService commonService;
    
    // admin user associate controller
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
    public ResponseEntity<ApiResponse> getAllUserSolarAssessmentController(
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "12")
        int size,
        @RequestParam(defaultValue = "createdAt")
        String sortBy,
        @RequestParam(defaultValue = "desc")
        String direction
    ) {
        
        Page_res_dto<UserSolarAssessment_res_dto> res = service.getAllUserSolarAssessmentService(
            page,
            size,
            sortBy,
            direction
        );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User solar assessment fetched successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // @PutMapping("auth/user-solar-assessment/mark-as-read")
    // public ResponseEntity<ApiResponse> userSolarAssessmentMarkAsReadController(@RequestBody Map<String, Long> body) {
        
    //     long id  = body.get("id");
    //     UserSolarAssessment_res_dto res = service.userSolarAssessmentMarkAsReadService(id);
    //     ApiResponse response = ApiResponse.builder()
    //         .success(true)
    //         .message("User solar assessment mark as read successfully")
    //         .data(res)
    //         .build();
    //     return ResponseEntity.ok(response);
    // }

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

    @PostMapping("forget-password/send-mail")
    public ResponseEntity<ApiResponse> sendMailController(@Valid @RequestBody ForgetPasswordGetMail_req_dto data) {

        AdminReg_res_dto res = service.sendForgetPasswordSendMailService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Send mail successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("forget-password/verify-code")
    public ResponseEntity<ApiResponse> verifyCodeController(@Valid @RequestBody VerifyCode_req_dto data) {

        String code = service.verifyCodeService(data);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Verification code verified successfully")
                .data(code)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("forget-password/change-password")
    public ResponseEntity<ApiResponse> changeForgetPasswordController(@Valid @RequestBody ForgetPasswordChange_req_dto data) {

        AdminReg_res_dto res = service.changeForgetPasswordService(data);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Password changed successfully")
                .data(res)
                .build();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("auth/get-all-admins")
    public ResponseEntity<ApiResponse> getAllAdminUserConroller(
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "12")
        int size,
        @RequestParam(defaultValue = "createdAt")
        String sortBy,
        @RequestParam(defaultValue = "desc")
        String direction
    ) {

        Page_res_dto<FullAdminDetails_res_dto> res = service.getAllAdminUserService(
            page,
            size,
            sortBy,
            direction
        );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Admin User fetched successfully")
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


    @GetMapping("auth/get-all-admins-list")
    public ResponseEntity<ApiResponse> getAllAdminsListController() {
        
        List<AdminList_res_dto> res = service.getAllAdminsListService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get all admin users successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/get-admin/{id}")
    public ResponseEntity<ApiResponse> getAdminForAssignmentByIdController(@PathVariable("id") long id) {
        
        AdminForAssignment_res_dto res = service.getAdminForAssignmentByIdService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get admin user by id successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // get count of all
    @GetMapping("auth/get-all-count")
    public ResponseEntity<ApiResponse> getCountOfAllController() {
        
        GetAllCount_res_dto res = service.getCountOfAllService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get all count successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // testimonial associate controllers
    @PutMapping("auth/testimonial/change-state/{id}")
    public ResponseEntity<ApiResponse> changeTestimonialIsAvailableStateContoller(@PathVariable("id") long id) {
        
        UserTestimonial_res_dto res = service.changeTestimonialIsAvailableStateService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Change user testimonial available state successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/testimonial/get-all")
    public ResponseEntity<ApiResponse> getAllUserTestimonialController(
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "12")
        int size,
        @RequestParam(defaultValue = "createdAt")
        String sortBy,
        @RequestParam(defaultValue = "desc")
        String direction
    ) {
        
        Page_res_dto<UserTestimonial_res_dto> res = service.getAllUserTestimonialService(
            page,
            size,
            sortBy,
            direction
        );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("All User testimonial fetch successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // product associate controllers
    @PostMapping( 
        value = "auth/product/add-product",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse> addNewProductController(@Valid @ModelAttribute ProductCreate_req_dto data) {
        
        FullProduct_res_dto res = service.addNewProductService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Add new product successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PatchMapping(
        value = "auth/product/edit/{id}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse> editProductController(@PathVariable long id, @ModelAttribute ProductEdit_req_dto data) {
        
        FullProduct_res_dto res = service.editProductService(id, data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Add new product successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }
   
    @GetMapping("auth/product/get-deleted")
    public ResponseEntity<ApiResponse> getDeletedProductController(
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "12")
        int size,
        @RequestParam(defaultValue = "createdAt")
        String sortBy,
        @RequestParam(defaultValue = "desc")
        String direction
    ) {
        
        Page_res_dto<FullProduct_res_dto> res =
                commonService.getProductService(
                        page,
                        size,
                        sortBy,
                        direction,
                        "deleted"
                );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get deleted product successfully page = " + page)
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }
   
    @DeleteMapping("auth/product/delete/{id}")
    public ResponseEntity<ApiResponse> availabilitySwapProductController(@PathVariable("id") long id) {
        
        FullProduct_res_dto res = service.availabilitySwapProductService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Change user testimonial available state successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    // project associate controllers
    @PostMapping(
        value = "auth/project/add-project",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse> addNewProjectController(@Valid @ModelAttribute ProjectCreate_req_dto data) {
        
        FullProject_res_dto res = service.addNewProjectService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Add new project successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PatchMapping(
        value = "auth/project/edit/{id}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse> editProjectController(@PathVariable long id, @ModelAttribute ProjectEdit_req_dto data) {
        
        FullProject_res_dto res = service.editProjectService(id, data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Edit project successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/project/get-deleted")
    public ResponseEntity<ApiResponse> getDeletedProjectsController(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String direction
    ) {

        Page_res_dto<FullProject_res_dto> res =
                commonService.getProjectService(
                        page,
                        size,
                        sortBy,
                        direction,
                        "deleted"
                );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get deleted project successfully page = " + page)
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("auth/project/delete/{id}")
    public ResponseEntity<ApiResponse> availabilitySwapProjectController(@PathVariable("id") long id) {
        
        FullProject_res_dto res = service.availabilitySwapProjectService(id);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Change user testimonial available state successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

}
