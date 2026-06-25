package com.hung.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemUpsertRequest {
    @NotNull
    private LocalDate receivedDate;
    @NotNull
    private String itemName;
    @NotNull
    private String itemType;
    @NotNull
    private BigDecimal valueUsd;
    private Boolean sold = false;
    private BigDecimal receivedUsd;
}
