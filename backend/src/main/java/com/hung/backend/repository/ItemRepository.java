package com.hung.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hung.backend.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{
    
}
