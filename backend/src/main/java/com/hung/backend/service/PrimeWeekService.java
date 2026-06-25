package com.hung.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.hung.backend.dto.PrimeWeekResponse;
import com.hung.backend.entity.PrimeWeek;
import com.hung.backend.repository.PrimeWeekRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrimeWeekService {
    private final PrimeWeekRepository primeWeekRepository;

    private PrimeWeekResponse toResponse(PrimeWeek primeWeek){
        return new PrimeWeekResponse(
            primeWeek.getId(),
            primeWeek.getWeekNumber()
        );
    }

    public List<PrimeWeekResponse> getAllWeeks() {
        return primeWeekRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
    public PrimeWeekResponse createWeek(){
        Integer nextWeekNumber = Optional.ofNullable(
                primeWeekRepository.findMaxWeekNumber())
                .map(maxWeekNumber -> maxWeekNumber + 1)
                .orElse(1);

        var primeWeek = new PrimeWeek();
        primeWeek.setWeekNumber(nextWeekNumber);
        return toResponse(primeWeekRepository.save(primeWeek));
    }
}
