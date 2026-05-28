package lk.bmn_technologies.backend.dto.requestDTO;

import java.sql.Date;

public class ProjectFilterDTO {
    private String category;
    private String province;
    private Date projectMinDate;
    private Date projectMaxDate;

    public ProjectFilterDTO(String category, String province, Date projectMaxDate, Date projectMinDate) {
        this.category = category;
        this.province = province;
        this.projectMaxDate = projectMaxDate;
        this.projectMinDate = projectMinDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Date getProjectMinDate() {
        return projectMinDate;
    }

    public void setProjectMinDate(Date projectMinDate) {
        this.projectMinDate = projectMinDate;
    }

    public Date getProjectMaxDate() {
        return projectMaxDate;
    }

    public void setProjectMaxDate(Date projectMaxDate) {
        this.projectMaxDate = projectMaxDate;
    }
}
