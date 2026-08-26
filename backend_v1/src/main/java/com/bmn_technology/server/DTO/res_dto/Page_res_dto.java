package com.bmn_technology.server.DTO.res_dto;

import java.util.List;

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
public class Page_res_dto<T> {

    private List<T> items;
    private int currentPage;
    private int pageSize;
    private long totalItems;
    private int totalPages;
}
