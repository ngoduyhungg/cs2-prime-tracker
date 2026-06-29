import type { ReactNode } from "react";

import type { Item } from "../types/item";
import ItemIcon from "./ItemIcon";

type HighlightVariant = "drop" | "sale";

type HighlightCardProps = {
    variant: HighlightVariant;
    label: string;
    item: Item | null;
    emptyTitle: string;
    emptyDescription: string;
    emptyIcon: string;
    primaryMetricLabel: string;
    primaryMetricValue: ReactNode;
    secondaryMetricLabel: string;
    secondaryMetricValue: ReactNode;
};

const variantStyles = {
    drop: {
        label: "text-amber-300",
        border: "border-amber-500/20",
        background:
            "bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30",
    },
    sale: {
        label: "text-emerald-300",
        border: "border-emerald-500/20",
        background:
            "bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30",
    },
};

function HighlightCard({
    variant,
    label,
    item,
    emptyTitle,
    emptyDescription,
    emptyIcon,
    primaryMetricLabel,
    primaryMetricValue,
    secondaryMetricLabel,
    secondaryMetricValue,
}: HighlightCardProps) {
    const styles = variantStyles[variant];

    if (!item) {
        return (
            <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p
                            className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.label}`}
                        >
                            {label}
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-slate-100">
                            {emptyTitle}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {emptyDescription}
                        </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
                        {emptyIcon}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className={`rounded-3xl border p-6 shadow-sm ${styles.border} ${styles.background}`}
        >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                    <ItemIcon item={item} size="md" />

                    <div className="min-w-0">
                        <p
                            className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.label}`}
                        >
                            {label}
                        </p>

                        <h2 className="mt-2 truncate text-xl font-bold text-slate-100">
                            {item.itemName}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {item.itemType} · Tuần {item.weekNumber} ·{" "}
                            {item.receivedDate}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:min-w-[320px]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            {primaryMetricLabel}
                        </p>

                        <div className="mt-1">{primaryMetricValue}</div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            {secondaryMetricLabel}
                        </p>

                        <div className="mt-2">{secondaryMetricValue}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HighlightCard;