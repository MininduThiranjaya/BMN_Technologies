package lk.bmn_technologies.backend.dto.requestDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class SolarAssessmentRequestDTO {
    @NotBlank
    @Size(max = 150)
    private String fullName;
    @NotBlank
    @Size(max = 20)
    private String phoneNumber;
    @NotBlank
    @Email
    @Size(max = 150)
    private String email;
    @NotBlank
    @Size(max = 150)
    private String location;
    @NotNull
    private PropertyType propertyType;
    private ElectricityBillRange monthlyElectricityBill;
    private InterestedSolution interestedSolution;
    private String message;
}