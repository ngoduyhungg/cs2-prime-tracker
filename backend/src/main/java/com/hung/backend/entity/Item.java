package com.hung.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   @NotNull
   private Integer week;
   @NotNull
   private LocalDate receivedDate;
   @NotNull
   private String itemName;
   @NotNull
   private String itemType;
   private BigDecimal receivedUsd;
   @NotNull
   private BigDecimal valueUsd;
   private Boolean sold = false; 
}
