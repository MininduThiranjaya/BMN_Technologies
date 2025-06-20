package lk.bmn_technologies.backend.dto.responseDTO;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import lk.bmn_technologies.backend.model.ProjectImageModel;
import lk.bmn_technologies.backend.model.ProjectModel;

public class ProjectDTO {

    private String projectId;
    private String projectName;
    private String personName;
    private String location;
    private String projectDescription;
    private String category;
    private Date projectDate;
    private List<String> imageUrl;

    

    public ProjectDTO(String projectId, String projectName, String personName, String location,
            String projectDescription, String category, Date projectDate, List<ProjectImageModel> imageUrl) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.personName = personName;
        this.location = location;
        this.projectDescription = projectDescription;
        this.category = category;
        this.projectDate = projectDate;
        this.imageUrl = imageUrl.stream()
            .map(ProjectImageModel::getImageUrl)
            .collect(Collectors.toList());
    }

    public ProjectDTO(ProjectModel project) {
        this(
            project.getProjectId(),
            project.getProjectName(),
            project.getPersonName(),
            project.getLocation(),
            project.getProjectDescription(),
            project.getCategory(),
            project.getProjectDate(),
            project.getImageUrl()
        );
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getProjectDate() {
        return projectDate;
    }

    public void setProjectDate(Date projectDate) {
        this.projectDate = projectDate;
    }

    public List<String> getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(List<String> imageUrl) {
        this.imageUrl = imageUrl;
    }
}
