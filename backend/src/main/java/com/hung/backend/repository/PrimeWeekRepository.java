package com.hung.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hung.backend.entity.PrimeWeek;

public interface PrimeWeekRepository extends JpaRepository<PrimeWeek, Long>{
    @Query("SELECT MAX(p.weekNumber) FROM PrimeWeek p")
    Integer findMaxWeekNumber();
}
