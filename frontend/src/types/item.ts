type Item = {
    id: number,
    week: number,
    receivedDate: string,
    itemName: string,
    itemType: string,
    valueUsd: number,
    receivedUsd: number | null,
    sold: boolean
};

type CreateItemPayload = {
    week: number,
    receivedDate: string,
    itemName: string,
    itemType: string,
    valueUsd: number,
    receivedUsd: number | null,
    sold: boolean
}
export type { Item, CreateItemPayload };