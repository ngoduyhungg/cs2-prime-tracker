import type { ItemType } from "../constants/itemTypes";

type CatalogItemSource = "skins" | "crates" | "stickers" | "graffiti";

type CatalogItem = {
    id: string;
    name: string;
    marketHashName: string;
    itemType: ItemType;
    imageUrl: string | null;
    source: CatalogItemSource;
};

export type { CatalogItem, CatalogItemSource };