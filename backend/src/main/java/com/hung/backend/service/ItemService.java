package com.hung.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;

import com.hung.backend.dto.ItemResponse;
import com.hung.backend.dto.ItemUpsertRequest;
import com.hung.backend.dto.SellItemRequest;
import com.hung.backend.entity.Item;
import com.hung.backend.entity.PrimeWeek;
import com.hung.backend.repository.ItemRepository;
import com.hung.backend.repository.PrimeWeekRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final PrimeWeekRepository primeWeekRepository;

    private ItemResponse toResponse(Item item){
        return new ItemResponse(
            item.getId(),
            item.getPrimeWeek().getId(),
            item.getPrimeWeek().getWeekNumber(),
            item.getReceivedDate(),
            item.getItemName(),
            item.getItemType(),
            item.getValueUsd(),
            item.getSold(),
            item.getReceivedUsd()
        );
    }

    public List<ItemResponse> getAllItems(){
        return itemRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ItemResponse createItemInWeek(Long weekId, ItemUpsertRequest request){
        PrimeWeek primeWeek = primeWeekRepository.findById(weekId).orElseThrow( () -> new RuntimeException("Week not found"));
        var item = new Item();
        item.setReceivedDate(request.getReceivedDate());
        item.setItemName(request.getItemName());
        item.setItemType(request.getItemType());
        item.setValueUsd(request.getValueUsd());
        boolean sold = request.getSold() != null ? request.getSold() : false;
        item.setSold(sold);
        if(sold){
            item.setReceivedUsd(request.getReceivedUsd());
        } else{
            item.setReceivedUsd(null);
        }
        item.setPrimeWeek(primeWeek);
        Item savedItem = itemRepository.save(item);
        return toResponse(savedItem);
    }

    public ItemResponse updateItem(Long id, ItemUpsertRequest newItem){
        Item oldItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item to update is not found!"));

        oldItem.setReceivedDate(newItem.getReceivedDate());
        oldItem.setItemName(newItem.getItemName());
        oldItem.setItemType(newItem.getItemType());
        oldItem.setValueUsd(newItem.getValueUsd());

        boolean sold = newItem.getSold() != null ? newItem.getSold() : false;
        oldItem.setSold(sold);
        if(sold){
            oldItem.setReceivedUsd(newItem.getReceivedUsd());
        } else {
            oldItem.setReceivedUsd(null);
        }
        Item savedItem = itemRepository.save(oldItem);
        return toResponse(savedItem);
    }

    public ItemResponse sellItem(Long id, SellItemRequest request){
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item to sell is not found!"));
        item.setSold(true);
        item.setReceivedUsd(request.getReceivedUsd());
        Item savedItem = itemRepository.save(item);
        return toResponse(savedItem);
    }

    public void deleteItem(Long id){
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item to delete is not found!"));
        itemRepository.delete(item);
    }
}
