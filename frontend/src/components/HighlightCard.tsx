import type { ReactNode } from "react";

import type { Item } from "../types/item";
import ItemIcon from "./ItemIcon";
import { getItemTypeVisual } from "../utils/itemVisuals";
import { getDisplayItemName, getWearInfo } from "../utils/itemWear";

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
    compact?: boolean;
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
    compact = false,
}: HighlightCardProps) {
    const styles = variantStyles[variant];
    const itemVisual = item ? getItemTypeVisual(item.itemType) : null;
    const displayName = item ? getDisplayItemName(item.itemName) : null;
    const wearInfo = item ? getWearInfo(item.itemName) : null;
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
    if (compact) {
        return (
            <section
                className={`rgb-border-card rgb-border-card-soft relative overflow-hidden rounded-3xl border p-5 shadow-sm ${styles.border} ${styles.background}`}
            >
                {item.imageUrl && (
                    <img
                        src={item.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rotate-12 object-contain opacity-[0.08] blur-[1px]"
                    />
                )}

                {itemVisual && (
                    <div
                        className={`pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full blur-3xl ${itemVisual.softBgClass}`}
                    />
                )}

                <div className="relative z-10">
                    <p
                        className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.label}`}
                    >
                        {label}
                    </p>

                    <div className="mt-4 flex min-w-0 items-center gap-3">
                        <ItemIcon item={item} size="sm" />

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-slate-100">
                                {displayName}
                            </h2>

                            {wearInfo && (
                                <span
                                    className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${wearInfo.borderClass} ${wearInfo.bgClass} ${wearInfo.textClass}`}
                                >
                                    {wearInfo.label}
                                </span>
                            )}

                            <p className="mt-1 text-xs text-slate-400">
                                {item.itemType} · Tuần {item.weekNumber}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div
                            className={`rounded-2xl border px-3 py-3 ${
                                itemVisual
                                    ? `${itemVisual.borderClass} ${itemVisual.softBgClass}`
                                    : "border-slate-800 bg-slate-950/50"
                            }`}
                        >
                            <p className="text-[11px] text-slate-500">
                                {primaryMetricLabel}
                            </p>

                            <div className="mt-1">{primaryMetricValue}</div>
                        </div>

                        <div
                            className={`rounded-2xl border px-3 py-3 ${
                                itemVisual
                                    ? `${itemVisual.borderClass} ${itemVisual.softBgClass}`
                                    : "border-slate-800 bg-slate-950/50"
                            }`}
                        >
                            <p className="text-[11px] text-slate-500">
                                {secondaryMetricLabel}
                            </p>

                            <div className="mt-1">{secondaryMetricValue}</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section
            className={`rgb-border-card rgb-border-card-soft relative overflow-hidden rounded-3xl border p-6 shadow-sm ${styles.border} ${styles.background}`}
        >
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rotate-12 object-contain opacity-[0.08] blur-[1px] md:h-56 md:w-56"
                />
            )}

            {itemVisual && (
                <div
                    className={`pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full blur-3xl ${itemVisual.softBgClass}`}
                />
            )}
            <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                    <ItemIcon item={item} size="md" />

                    <div className="min-w-0">
                        <p
                            className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.label}`}
                        >
                            {label}
                        </p>

                        <h2 className="mt-2 truncate text-xl font-bold text-slate-100">
                            {displayName}
                        </h2>
                        {wearInfo && (
                            <span
                                className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${wearInfo.borderClass} ${wearInfo.bgClass} ${wearInfo.textClass}`}
                            >
                                {wearInfo.label}
                            </span>
                        )}
                        <p className="mt-1 text-sm text-slate-400">
                            {item.itemType} · Tuần {item.weekNumber} ·{" "}
                            {item.receivedDate}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:min-w-[320px]">
                    <div
                        className={`rounded-2xl border px-4 py-3 ${
                            itemVisual
                                ? `${itemVisual.borderClass} ${itemVisual.softBgClass}`
                                : "border-slate-800 bg-slate-950/50"
                        }`}
                    >
                        <p className="text-xs text-slate-500">
                            {primaryMetricLabel}
                        </p>

                        <div className="mt-1">{primaryMetricValue}</div>
                    </div>

                    <div
                        className={`rounded-2xl border px-4 py-3 ${
                            itemVisual
                                ? `${itemVisual.borderClass} ${itemVisual.softBgClass}`
                                : "border-slate-800 bg-slate-950/50"
                        }`}
                    >
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