import type { Item } from "../types/item";
import { getItemTypeVisual } from "../utils/itemVisuals";

type ItemIconProps = {
    item: Item;
    size?: "sm" | "md";
};

function ItemIcon({ item, size = "sm" }: ItemIconProps) {
    const sizeClass = size === "sm" ? "h-14 w-14" : "h-16 w-16";
    const textSizeClass = size === "sm" ? "text-sm" : "text-base";
    const visual = getItemTypeVisual(item.itemType);

    if (item.imageUrl) {
        return (
            <div
                className={`${sizeClass} flex shrink-0 items-center justify-center rounded-2xl border ${visual.borderClass} ${visual.softBgClass} p-2 shadow-sm ${visual.glowClass}`}
            >
                <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div
            className={`${sizeClass} flex shrink-0 items-center justify-center rounded-2xl border font-bold ${textSizeClass} ${visual.borderClass} ${visual.bgClass} ${visual.textClass}`}
        >
            {visual.shortName}
        </div>
            );
}

export default ItemIcon;