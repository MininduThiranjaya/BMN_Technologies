package lk.bmn_technologies.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ProductFilterDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ProjectFilterDTO;
import lk.bmn_technologies.backend.dto.responseDTO.ProductDTO;
import lk.bmn_technologies.backend.dto.responseDTO.ProjectDTO;
import lk.bmn_technologies.backend.model.ProjectModel;
import lk.bmn_technologies.backend.services.ProjectService;

@RestController
@RequestMapping("/api/auth/project")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @PostMapping("/add")
    public void addProjectIntoDatabase(@RequestBody ProjectModel data) {
        service.addProject(data);
    }

    @GetMapping("/get/{category}")
    public List<ProjectDTO> getProjectsFromDatabase(@PathVariable("category") String category) {
        return service.getProjects(category);
    }

    @PostMapping("/get/filter")
    public List<ProjectDTO> getFilteredProductsFromDatabase(@RequestBody ProjectFilterDTO filters) {
        return service.getFilteredProject(filters);
    }

    @GetMapping("/count")
    public long countProjectsInDatabase() {
        return service.countProjects();
    }

    @GetMapping("/get/all")
    public List<ProjectModel> getProjectWithAllDetailsFromDatabase() {
        return service.getProjectWithAllDetails();
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<ApiResponseDTO> deleteProductFromDatabase(@PathVariable("id") long id) {
        try{
            ApiResponseDTO response = service.deleteProject(id);
            return ResponseEntity.ok(response);
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error deleting product: " + e.getMessage()));
        }
    }
}