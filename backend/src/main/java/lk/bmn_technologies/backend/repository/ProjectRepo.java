package lk.bmn_technologies.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.ProjectModel;

@Repository
public interface ProjectRepo extends JpaRepository<ProjectModel, Long> {
    // Define any custom query methods if needed

}
