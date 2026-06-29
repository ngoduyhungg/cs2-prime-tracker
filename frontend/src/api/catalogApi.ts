import type { CatalogItem } from "../types/catalog";

const CATALOG_BASE_URL =
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en";

let cachedCatalogItems: CatalogItem[] | null = null;
let catalogItemsPromise: Promise<CatalogItem[]> | null = null;

type RawCatalogItem = {
    id: string;
    name: string;
    market_hash_name?: string | null;
    image?: string | null;
    type?: string | null;
};

async function fetchCatalogEndpoint<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${CATALOG_BASE_URL}/${endpoint}`);

    if (!response.ok) {
        throw new Error(`Không thể tải catalog: ${endpoint}`);
    }

    return response.json() as Promise<T>;
}

function normalizeCatalogItem(
    rawItem: RawCatalogItem,
    itemType: CatalogItem["itemType"],
    source: CatalogItem["source"]
): CatalogItem {
    return {
        id: `${source}-${rawItem.id}`,
        name: rawItem.name,
        marketHashName: rawItem.market_hash_name?.trim() || rawItem.name,
        itemType,
        imageUrl: rawItem.image ?? null,
        source,
    };
}

function normalizeCrateItem(rawItem: RawCatalogItem): CatalogItem {
    const crateText = `${rawItem.type ?? ""} ${rawItem.name}`.toLowerCase();
    const itemType = crateText.includes("case") ? "Case" : "Other";

    return normalizeCatalogItem(rawItem, itemType, "crates");
}

function removeDuplicateCatalogItems(items: CatalogItem[]) {
    const itemMap = new Map<string, CatalogItem>();

    items.forEach((item) => {
        if (!itemMap.has(item.marketHashName)) {
            itemMap.set(item.marketHashName, item);
        }
    });

    return Array.from(itemMap.values()).sort((firstItem, secondItem) =>
        firstItem.name.localeCompare(secondItem.name)
    );
}

async function loadCatalogItems(): Promise<CatalogItem[]> {
    const [skins, crates, stickers, graffiti] = await Promise.all([
        fetchCatalogEndpoint<RawCatalogItem[]>("skins_not_grouped.json"),
        fetchCatalogEndpoint<RawCatalogItem[]>("crates.json"),
        fetchCatalogEndpoint<RawCatalogItem[]>("stickers.json"),
        fetchCatalogEndpoint<RawCatalogItem[]>("graffiti.json"),
    ]);

    const catalogItems = [
        ...skins.map((item) => normalizeCatalogItem(item, "Skin", "skins")),
        ...crates.map((item) => normalizeCrateItem(item)),
        ...stickers.map((item) =>
            normalizeCatalogItem(item, "Sticker", "stickers")
        ),
        ...graffiti.map((item) =>
            normalizeCatalogItem(item, "Graffiti", "graffiti")
        ),
    ];

    return removeDuplicateCatalogItems(catalogItems);
}

function getCachedCatalogItems() {
    return cachedCatalogItems;
}

async function getCatalogItems(): Promise<CatalogItem[]> {
    if (cachedCatalogItems) {
        return cachedCatalogItems;
    }

    if (catalogItemsPromise) {
        return catalogItemsPromise;
    }

    catalogItemsPromise = loadCatalogItems()
        .then((items) => {
            cachedCatalogItems = items;
            return items;
        })
        .catch((error) => {
            catalogItemsPromise = null;
            throw error;
        });

    return catalogItemsPromise;
}

export { getCatalogItems, getCachedCatalogItems };