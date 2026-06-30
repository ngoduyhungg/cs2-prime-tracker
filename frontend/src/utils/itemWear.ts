type WearInfo = {
    label: string;
    textClass: string;
    bgClass: string;
    borderClass: string;
};

const wearOptions: WearInfo[] = [
    {
        label: "Factory New",
        textClass: "text-sky-300",
        bgClass: "bg-sky-500/10",
        borderClass: "border-sky-400/20",
    },
    {
        label: "Minimal Wear",
        textClass: "text-emerald-300",
        bgClass: "bg-emerald-500/10",
        borderClass: "border-emerald-400/20",
    },
    {
        label: "Field-Tested",
        textClass: "text-yellow-300",
        bgClass: "bg-yellow-500/10",
        borderClass: "border-yellow-400/20",
    },
    {
        label: "Well-Worn",
        textClass: "text-orange-300",
        bgClass: "bg-orange-500/10",
        borderClass: "border-orange-400/20",
    },
    {
        label: "Battle-Scarred",
        textClass: "text-rose-300",
        bgClass: "bg-rose-500/10",
        borderClass: "border-rose-400/20",
    },
];

function getWearInfo(itemName: string): WearInfo | null {
    return (
        wearOptions.find((wear) =>
            itemName.includes(`(${wear.label})`)
        ) ?? null
    );
}

function getDisplayItemName(itemName: string) {
    return wearOptions.reduce(
        (name, wear) => name.replace(` (${wear.label})`, ""),
        itemName
    );
}

export type { WearInfo };
export { getWearInfo, getDisplayItemName };