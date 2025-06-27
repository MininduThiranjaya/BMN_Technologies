package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.ProjectDTO;
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

    public List<ProjectDTO> getProduct(String category) {

        String filter;

        filter = switch (category) {
            case "residential" -> "Residential Solar";
            case "commercial" -> "Commercial Buildings";
            default -> "Industrial Solutions";
        };

        return repo.findAll().stream()
            .filter(project -> project.getCategory().equals(filter))
            .map(ProjectDTO::new)
            .collect(Collectors.toList());
    }

    public long countProducts() {
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