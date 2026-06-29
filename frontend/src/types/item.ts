type Item = {
    id: number,
    weekId: number;
    weekNumber: number;
    receivedDate: string,
    itemName: string,
    itemType: string,
    marketHashName: string | null;
    imageUrl: string | null;
    valueUsd: number,
    receivedUsd: number | null,
    sold: boolean
};

type CreateItemPayload = {
    receivedDate: string,
    itemName: string,
    itemType: string,
    marketHashName?: string | null;
    imageUrl?: string | null;
    valueUsd: number,
    receivedUsd: number | null,
    sold: boolean
}
export type { Item, CreateItemPayload };