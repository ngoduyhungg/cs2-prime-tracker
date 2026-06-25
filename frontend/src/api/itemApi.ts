import type { Item, CreateItemPayload } from "../types/item";


const API_URL = "http://localhost:8080/api";

async function getItems(): Promise<Item[]>{
    const response = await fetch(`${API_URL}/items`);
    if(!response.ok){
        throw new Error("Failed to fetch items");
    }
    return response.json();
}

async function createItemInWeek(weekId: number, payload: CreateItemPayload): Promise<Item>{
    const response = await fetch(`${API_URL}/weeks/${weekId}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });
    if(!response.ok){
        throw new Error("Failed to create item");
    }
    return response.json();
}

async function updateItem(
    id: number,
    payload: CreateItemPayload
): Promise<Item> {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload)
    });
    if(!response.ok){
        throw new Error("Failed to update item");
    }
    return response.json();
}

async function deleteItem(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE"
    });
    if(!response.ok){
        throw new Error("Failed to delete item");
    }
}

export { getItems, createItemInWeek, updateItem, deleteItem };