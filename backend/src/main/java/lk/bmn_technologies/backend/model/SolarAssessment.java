package lk.bmn_technologies.backend.model;

import jakarta.persistence.*;
import lk.bmn_technologies.backend.enums.ElectricityBillRange;
import lk.bmn_technologies.backend.enums.InterestedSolution;
import lk.bmn_technologies.backend.enums.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String fullName;
    @Column(nullable = false, length = 20)
    private String phoneNumber;
    @Column(nullable = false, length = 150)
    private String email;
    @Column(nullable = false, length = 150)
    private String location;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PropertyType propertyType;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ElectricityBillRange monthlyElectricityBill;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private InterestedSolution interestedSolution;
    private String message;
    private int action;
    private int available;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}