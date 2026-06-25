package com.hung.backend.controller;

import com.hung.backend.service.ItemService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.hung.backend.dto.ItemResponse;
import com.hung.backend.dto.ItemUpsertRequest;
import com.hung.backend.dto.SellItemRequest;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    @GetMapping("/items")
    public List<ItemResponse> getAllItems(){
        return itemService.getAllItems();
    }

    @PostMapping("/weeks/{weekId}/items")
    public ItemResponse createItemInWeek(@PathVariable Long weekId, @Valid @RequestBody ItemUpsertRequest request) {
        return itemService.createItemInWeek(weekId, request);
    }

    @PutMapping("/items/{id}")
    public ItemResponse updateItem(@PathVariable Long id, @RequestBody ItemUpsertRequest newItem) {
        return itemService.updateItem(id, newItem);
    }

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id){
        itemService.deleteItem(id);
    }

    @PatchMapping("/items/{id}/sold")
    public ItemResponse sellItem(@PathVariable Long id,@RequestBody SellItemRequest request){
        return itemService.sellItem(id, request);
    }
}
