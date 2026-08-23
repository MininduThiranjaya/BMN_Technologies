package lk.bmn_technologies.backend.services;

import java.util.*;

import lk.bmn_technologies.backend.repository.SolarAssessmentRepo;
import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.SolarAssessmentRequestDTO;
import lk.bmn_technologies.backend.model.SolarAssessment;
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.dto.responseDTO.SolarAssessmentResponseDTO;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SolarAssessmentService {
    
    private final SolarAssessmentRepo repo;

    public ApiResponseDTO submitSolarAssessmentService(SolarAssessmentRequestDTO data) {
        
        SolarAssessment assessment = SolarAssessment.builder()
            .fullName(data.getFullName())
            .phoneNumber(data.getPhoneNumber())
            .email(data.getEmail())
            .location(data.getLocation())
            .propertyType(data.getPropertyType())
            .monthlyElectricityBill(data.getMonthlyElectricityBill())
            .interestedSolution(data.getInterestedSolution())
            .message(data.getMessage())
            .action(0)
            .available(1)
            .build();
        repo.save(assessment);
        return (new ApiResponseDTO(true, "Saved successfully"));
    }

    public List<SolarAssessmentResponseDTO> getAllSolarAssessmentService() {
        try {
            List<SolarAssessment> solarAssessment = repo.findAll();
            return solarAssessment.stream()
                .map(assessment -> SolarAssessmentResponseDTO.builder()
                        .id(assessment.getId())
                        .fullName(assessment.getFullName())
                        .phoneNumber(assessment.getPhoneNumber())
                        .email(assessment.getEmail())
                        .location(assessment.getLocation())
                        .propertyType(assessment.getPropertyType())
                        .monthlyElectricityBill(
                                assessment.getMonthlyElectricityBill()
                        )
                        .interestedSolution(
                                assessment.getInterestedSolution()
                        )
                        .message(assessment.getMessage())
                        .action(assessment.getAction())
                        .available(assessment.getAvailable())
                        .createdAt(assessment.getCreatedAt())
                        .updatedAt(assessment.getUpdatedAt())
                        .build()
                )
                .toList();
        } catch (Exception e) {
            e.printStackTrace(); // log the real exception
            return Collections.emptyList(); // safely return empty list
        }
    }

    public String changeActionService(long id) {
        SolarAssessment tempData = repo.getById(id);
        if(tempData.getAction() == 0) {
            tempData.setAction(1);
            repo.save(tempData);
            return "Took an action";
        }
        else {
            tempData.setAction(0);
            repo.save(tempData);
            return "Dint took an action";
        }
    }

    public String markAsReadService(long id) {
        SolarAssessment tempData = repo.getById(id);
        tempData.setAvailable(0);
        tempData.setAction(1);
        repo.save(tempData);
        return "Marked as read";
    }
}
