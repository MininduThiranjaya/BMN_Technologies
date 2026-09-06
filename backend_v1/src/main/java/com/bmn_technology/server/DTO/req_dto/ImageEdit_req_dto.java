package com.bmn_technology.server.DTO.req_dto;

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
public class ImageEdit_req_dto {

    private String action; // add, remove, replace
    private Long id;
}
