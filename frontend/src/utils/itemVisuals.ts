type ItemTypeVisual = {
    shortName: string;
    textClass: string;
    borderClass: string;
    bgClass: string;
    softBgClass: string;
    hoverBorderClass: string;
    glowClass: string;
};

function getItemTypeVisual(itemType: string): ItemTypeVisual {
    switch (itemType) {
        case "Case":
            return {
                shortName: "CA",
                textClass: "text-amber-300",
                borderClass: "border-amber-400/30",
                bgClass: "bg-amber-500/10",
                softBgClass: "bg-amber-500/5",
                hoverBorderClass: "hover:border-amber-400/50",
                glowClass: "shadow-amber-500/10",
            };

        case "Skin":
            return {
                shortName: "SK",
                textClass: "text-cyan-300",
                borderClass: "border-cyan-400/30",
                bgClass: "bg-cyan-500/10",
                softBgClass: "bg-cyan-500/5",
                hoverBorderClass: "hover:border-cyan-400/50",
                glowClass: "shadow-cyan-500/10",
            };

        case "Sticker":
            return {
                shortName: "ST",
                textClass: "text-emerald-300",
                borderClass: "border-emerald-400/30",
                bgClass: "bg-emerald-500/10",
                softBgClass: "bg-emerald-500/5",
                hoverBorderClass: "hover:border-emerald-400/50",
                glowClass: "shadow-emerald-500/10",
            };

        case "Graffiti":
            return {
                shortName: "GR",
                textClass: "text-fuchsia-300",
                borderClass: "border-fuchsia-400/30",
                bgClass: "bg-fuchsia-500/10",
                softBgClass: "bg-fuchsia-500/5",
                hoverBorderClass: "hover:border-fuchsia-400/50",
                glowClass: "shadow-fuchsia-500/10",
            };

        default:
            return {
                shortName: "OT",
                textClass: "text-slate-300",
                borderClass: "border-slate-600/40",
                bgClass: "bg-slate-700/30",
                softBgClass: "bg-slate-700/10",
                hoverBorderClass: "hover:border-slate-500/60",
                glowClass: "shadow-slate-500/10",
            };
    }
}

export { getItemTypeVisual };