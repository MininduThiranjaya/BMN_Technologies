package lk.bmn_technologies.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.UserTestimonialCommentModel;

@Repository
public interface UserTestimonialCommentRepository extends JpaRepository<UserTestimonialCommentModel, Long>{

    @Query("select t from UserTestimonialCommentModel t")
    public List<UserTestimonialCommentModel> getUserTestimonialComment(Pageable pageable);
}
