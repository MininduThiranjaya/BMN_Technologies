package lk.bmn_technologies.backend.dto.responseDTO;

import java.time.LocalDateTime;

import lk.bmn_technologies.backend.enums.ElectricityBillRange;
import lk.bmn_technologies.backend.enums.InterestedSolution;
import lk.bmn_technologies.backend.enums.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessmentResponseDTO {
    
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String location;
    private PropertyType propertyType;
    private ElectricityBillRange monthlyElectricityBill;
    private InterestedSolution interestedSolution;
    private String message;
    private int action;
    private int available;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
