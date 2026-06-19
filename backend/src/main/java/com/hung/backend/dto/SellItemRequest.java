package com.hung.backend.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SellItemRequest {
    private BigDecimal receivedUsd;
}
