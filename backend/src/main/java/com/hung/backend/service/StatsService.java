package com.hung.backend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hung.backend.entity.Item;
import com.hung.backend.dto.StatsResponse;
import com.hung.backend.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatsService {
    private final ItemRepository itemRepository;

    public StatsResponse getStats(){
        BigDecimal primeCost = BigDecimal.valueOf(15);
        BigDecimal recovered = BigDecimal.valueOf(0);
        BigDecimal progress;
        BigDecimal remaining;

        List<Item> items = itemRepository.findAll();

        for (Item item : items) {
            if(Boolean.TRUE.equals(item.getSold()) && item.getReceivedUsd() != null){
                recovered = recovered.add(item.getReceivedUsd());
            } 
        }
        remaining = primeCost.subtract(recovered);
        progress = recovered.multiply(BigDecimal.valueOf(100)).divide((primeCost), 2, RoundingMode.HALF_UP);
        return new StatsResponse(primeCost, recovered, remaining, progress);
    }
}
