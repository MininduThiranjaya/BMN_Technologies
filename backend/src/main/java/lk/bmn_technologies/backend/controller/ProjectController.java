package lk.bmn_technologies.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/get")
    public List<ProjectDTO> getProductsFromDatabase() {
        return service.getProduct();
    }

    @GetMapping("/count")
    public long countProductsInDatabase() {
        return service.countProducts();
    }
}
