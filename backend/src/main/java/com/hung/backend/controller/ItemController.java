package com.hung.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hung.backend.repository.ItemRepository;
import com.hung.backend.dto.SellItemRequest;
import com.hung.backend.entity.Item;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemRepository itemRepository;
    @GetMapping
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }
    
    @PostMapping
    public Item createItem(@RequestBody Item item){
        return itemRepository.save(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item newItem) {
        Item oldItem = itemRepository.findById(id).orElseThrow();
        oldItem.setWeek(newItem.getWeek());
        oldItem.setReceivedDate(newItem.getReceivedDate());
        oldItem.setItemName(newItem.getItemName());
        oldItem.setItemType(newItem.getItemType());
        oldItem.setReceivedUsd(newItem.getReceivedUsd());
        oldItem.setValueUsd(newItem.getValueUsd());
        oldItem.setSold(newItem.getSold());
        return itemRepository.save(oldItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id){
        itemRepository.deleteById(id);
    }

    @PatchMapping("/{id}/sold")
    public Item soldItem(@PathVariable Long id,@RequestBody SellItemRequest request){
        Item item = itemRepository.findById(id).orElseThrow();
        item.setSold(true);
        item.setReceivedUsd(request.getReceivedUsd());
        return itemRepository.save(item);
    }
}
