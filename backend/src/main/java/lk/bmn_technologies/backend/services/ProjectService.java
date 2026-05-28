package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ProjectFilterDTO;
import lk.bmn_technologies.backend.model.ProjectImageModel;
import lk.bmn_technologies.backend.model.ProjectModel;
import lk.bmn_technologies.backend.repository.ProjectImageRepo;
import lk.bmn_technologies.backend.repository.ProjectRepo;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ProjectImageRepo projectImageRepo;
    
    public void addProject(ProjectModel data) {

        if(data.getImageUrl() != null) {
            for(ProjectImageModel image : data.getImageUrl()) {
                image.setProject(data);
            }
        }
        repo.save(data);
    }

    public void editProject(Long id, ProjectModel data) {

        if(repo.existsById(id)) {
            
            Optional<ProjectModel> existing = repo.findById(id);
            ProjectModel existingObject = existing.get();
            
            if (data.getProjectId() != null) {
                existingObject.setProjectId(data.getProjectId());
            }

            if (data.getProjectName() != null) {
                existingObject.setProjectName(data.getProjectName());
            }

            if (data.getPersonName() != null) {
                existingObject.setPersonName(data.getPersonName());
            }

            if (data.getProvince() != null) {
                existingObject.setProvince(data.getProvince());
            }

            if (data.getLocation() != null) {
                existingObject.setLocation(data.getLocation());
            }

            if (data.getProjectDescription() != null) {
                existingObject.setProjectDescription(data.getProjectDescription());
            }

            if (data.getCategory() != null) {
                existingObject.setCategory(data.getCategory());
            }

            if (data.getProjectDate() != null) {
                existingObject.setProjectDate(data.getProjectDate());
            }

            // Images handling (replace strategy)
            if (data.getImageUrl() != null) {

                // remove old images
                if (existingObject.getImageUrl() != null) {
                    existingObject.getImageUrl().clear();
                }
                
                // add new images
                for (ProjectImageModel img : data.getImageUrl()) {
                    img.setProject(existingObject);
                }

                existingObject.setImageUrl(data.getImageUrl());
            }

            repo.save(existingObject);
        }
    }

    // public List<ProjectDTO> getProjects(String category) {

    //     String filter;

    //     filter = switch (category) {
    //         case "residential" -> "Residential Solar";
    //         case "commercial" -> "Commercial Buildings";
    //         default -> "Industrial Solutions";
    //     };

    //     return repo.findAll().stream()
    //         .filter(project -> project.getCategory().equals(filter))
    //         .map(ProjectDTO::new)
    //         .collect(Collectors.toList());
    // }

    public List<ProjectModel> getFilteredProject(ProjectFilterDTO projectFilter) {

        String filter;

        filter = switch (projectFilter.getCategory()) {
            case "all" -> "all";
            case "residential" -> "Residential Solar";
            case "commercial" -> "Commercial Buildings";
            default -> "Industrial Solutions";
        };
        System.out.println("Filter: " + projectFilter.getProvince());
        List<ProjectModel> filteredProjectList = repo.getFilteredProjects(filter, projectFilter.getProvince(), projectFilter.getProjectMinDate(), projectFilter.getProjectMaxDate());

        return filteredProjectList;
    }

    public long countProjects() {
        return repo.count();
    }

    public List<ProjectModel> getProjectWithAllDetails() {
       return repo.findAll();
    } 

    public ApiResponseDTO deleteProject(long id) {
        if(repo.existsById(id)) {
            List<String> imagePublicIdList = projectImageRepo.getProjectImages(id);
            Optional<ProjectModel> project = repo.findById(id);
            Map<String, Boolean> results = cloudinaryService.deleteImagesFromCloudinary(imagePublicIdList);
            if(results.values().stream().allMatch(Boolean::booleanValue)) {
                repo.deleteById(id);
                return new ApiResponseDTO(true, "Project deleted successfully", project);
            }
            return new ApiResponseDTO(false, "Failed project image deletion - Failed project deletion");
        }
        return new ApiResponseDTO(false, "Project is not available", null);
    }
}