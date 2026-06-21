import type { Item, CreateItemPayload } from "../types/item";

const API_URL = "http://localhost:8080/api";

async function getItems(): Promise<Item[]>{
    const response = await fetch(`${API_URL}/items`);
    if(!response.ok){
        throw new Error("Failed to fetch items");
    }
    return response.json();
}

async function createItem(payload: CreateItemPayload): Promise<Item>{
    const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if(!response.ok){
        throw new Error("Failed to create item");
    }
    return response.json();
}

export {getItems, createItem};