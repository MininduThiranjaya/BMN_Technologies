package lk.bmn_technologies.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.model.ProjectModel;
import lk.bmn_technologies.backend.repository.ProjectRepo;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;
    
    public void addProject(ProjectModel data) {
        repo.save(data);
    }
}
