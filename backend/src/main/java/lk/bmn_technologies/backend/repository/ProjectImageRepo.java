package lk.bmn_technologies.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.ProjectImageModel;

@Repository
public interface ProjectImageRepo extends JpaRepository<ProjectImageModel, Long>{

    @Query(value = "SELECT REPLACE(REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(p.image_url, '/upload/', -1), '/', -3), '.png', ''), '.jpg', '') AS publicId FROM project_image_model p WHERE p.project_id = ?1", nativeQuery = true)
    public List<String> getProjectImages(Long id);
}
