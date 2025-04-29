package lk.bmn_technologies.backend.dto;

import java.sql.Date;

public class UserTestimonialCommentDTO {

    private Long id;
    private String name;
    private String company;
    private String position;
    private String email;
    private String testimonial;
    private int rating;
    private Date date;

    public UserTestimonialCommentDTO(Long id, String name, String company, String position, String email, String testimonial, int rating, Date date) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.position = position;
        this.email = email;
        this.testimonial = testimonial;
        this.rating = rating;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCompany() {
        return company;
    }

    public String getPosition() {
        return position;
    }

    public String getEmail() {
        return email;
    }

    public String getTestimonial() {
        return testimonial;
    }

    public int getRating() {
        return rating;
    }

    public Date getDate() {
        return date;
    }
}
