import type { Stats } from "../types/stats";

const API_URL = "http://localhost:8080/api"

async function getStats(): Promise<Stats>{
    const response = await fetch(`${API_URL}/stats`);
    return response.json();
}

export { getStats }