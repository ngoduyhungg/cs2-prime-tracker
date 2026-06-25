package com.hung.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
   @ManyToOne
   @JoinColumn(name = "week_id")
   private PrimeWeek primeWeek;
   @NotNull
   private LocalDate receivedDate;
   @NotNull
   private String itemName;
   @NotNull
   private String itemType;
   @Column(name = "received_usd", precision = 12, scale = 6)
   private BigDecimal receivedUsd;
   @NotNull @Column(name = "value_usd", precision = 12, scale = 6, nullable = false)
   private BigDecimal valueUsd;
   private Boolean sold = false; 
}
