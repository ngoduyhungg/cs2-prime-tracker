type ItemType = "Case" | "Skin" | "Graffiti" | "Sticker" | "Other";

type ItemTypeFilter = "all" | ItemType;

const itemTypeOptions: { label: string; value: ItemType }[] = [
    { label: "Case", value: "Case" },
    { label: "Skin", value: "Skin" },
    { label: "Graffiti", value: "Graffiti" },
    { label: "Sticker", value: "Sticker" },
    { label: "Other", value: "Other" },
];

const itemTypeFilterOptions: { label: string; value: ItemTypeFilter }[] = [
    { label: "Tất cả loại", value: "all" },
    ...itemTypeOptions,
];

export type { ItemType, ItemTypeFilter };
export { itemTypeOptions, itemTypeFilterOptions };