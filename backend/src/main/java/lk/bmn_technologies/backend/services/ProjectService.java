package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.responseDTO.ProjectDTO;
import lk.bmn_technologies.backend.model.ProjectImageModel;
import lk.bmn_technologies.backend.model.ProjectModel;
import lk.bmn_technologies.backend.repository.ProjectRepo;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;
    
    public void addProject(ProjectModel data) {

        if(data.getImageUrl() != null) {
            for(ProjectImageModel image : data.getImageUrl()) {
                image.setProject(data);
            }
        }
        repo.save(data);
    }

    public List<ProjectDTO> getProduct() {
       return repo.findAll().stream()
            .map(ProjectDTO::new)
            .collect(Collectors.toList());
    }

    public long countProducts() {
        return repo.count();
    }
}
