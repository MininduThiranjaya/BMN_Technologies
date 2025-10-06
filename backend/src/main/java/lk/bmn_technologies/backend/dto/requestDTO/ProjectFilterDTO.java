package lk.bmn_technologies.backend.dto.requestDTO;

import java.sql.Date;

public class ProjectFilterDTO {
    private String category;
    private String location;
    private Date projectMinDate;
    private Date projectMaxnDate;

    public ProjectFilterDTO(String category, String location, Date projectMaxnDate, Date projectMinDate) {
        this.category = category;
        this.location = location;
        this.projectMaxnDate = projectMaxnDate;
        this.projectMinDate = projectMinDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getProjectMinDate() {
        return projectMinDate;
    }

    public void setProjectMinDate(Date projectMinDate) {
        this.projectMinDate = projectMinDate;
    }

    public Date getProjectMaxnDate() {
        return projectMaxnDate;
    }

    public void setProjectMaxnDate(Date projectMaxnDate) {
        this.projectMaxnDate = projectMaxnDate;
    }
}
