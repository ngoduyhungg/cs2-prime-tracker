package com.hung.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponse {
    private Long id;
    private Long weekId;
    private Integer weekNumber;
    private LocalDate receivedDate;
    private String itemName;
    private String itemType;
    private String marketHashName;
    private String imageUrl;
    private BigDecimal valueUsd;
    private Boolean sold;
    private BigDecimal receivedUsd;
}
