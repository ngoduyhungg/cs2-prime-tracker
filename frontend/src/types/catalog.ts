type CatalogItemType = "Case" | "Skin" | "Graffiti" | "Sticker" | "Other";

type CatalogItemSource = "skins" | "crates" | "stickers" | "graffiti";

type CatalogItem = {
    id: string;
    name: string;
    marketHashName: string;
    itemType: CatalogItemType;
    imageUrl: string | null;
    source: CatalogItemSource;
};

export type { CatalogItem, CatalogItemType, CatalogItemSource };