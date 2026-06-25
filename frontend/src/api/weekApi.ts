import type { PrimeWeek } from "../types/week";

const API_URL = "http://localhost:8080/api"

async function getWeeks(): Promise<PrimeWeek[]>{
    const response = await fetch(`${API_URL}/weeks`);
    if(!response.ok){
        throw new Error("Failed to create item");
    }
    return response.json();
}

async function createWeek(): Promise<PrimeWeek>{
    const response = await fetch(`${API_URL}/weeks`, {
        method: "POST"
    });
    if(!response.ok){
        throw new Error("Failed to create item");
    }
    return response.json();
}

export { getWeeks, createWeek }