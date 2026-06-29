import type { Item } from "../types/item";

type ItemIconProps = {
    item: Item;
    size?: "sm" | "md";
};

function getTypeStyle(itemType: string) {
    switch (itemType) {
        case "Case":
            return "border-amber-500/20 bg-amber-500/10 text-amber-300";
        case "Skin":
            return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300";
        case "Graffiti":
            return "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300";
        case "Sticker":
            return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
        default:
            return "border-slate-600/30 bg-slate-700/30 text-slate-300";
    }
}

function getTypeShortName(itemType: string) {
    switch (itemType) {
        case "Case":
            return "CA";
        case "Skin":
            return "SK";
        case "Graffiti":
            return "GR";
        case "Sticker":
            return "ST";
        default:
            return "OT";
    }
}

function ItemIcon({ item, size = "sm" }: ItemIconProps) {
    const sizeClass = size === "sm" ? "h-14 w-14" : "h-16 w-16";
    const textSizeClass = size === "sm" ? "text-sm" : "text-base";

    if (item.imageUrl) {
        return (
            <div
                className={`${sizeClass} flex shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 p-2`}
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
            className={`${sizeClass} flex shrink-0 items-center justify-center rounded-2xl border font-bold ${textSizeClass} ${getTypeStyle(
                item.itemType
            )}`}
        >
            {getTypeShortName(item.itemType)}
        </div>
    );
}

export default ItemIcon;