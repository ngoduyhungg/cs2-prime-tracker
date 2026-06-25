package com.hung.backend.controller;

import com.hung.backend.service.PrimeWeekService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hung.backend.dto.PrimeWeekResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/weeks")
public class PrimeWeekController{
    private final PrimeWeekService primeWeekService;
    @GetMapping
    public List<PrimeWeekResponse> getAllWeeks(){
        return primeWeekService.getAllWeeks();
    }
    @PostMapping
    public PrimeWeekResponse createWeek(){
        return primeWeekService.createWeek();
    }
}