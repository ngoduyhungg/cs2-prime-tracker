import type { Item } from "../types/item";

const API_URL = "http://localhost:8080/api";

async function getItems(): Promise<Item[]>{
    const response = await fetch(`${API_URL}/items`);
    return response.json();
}

export {getItems};