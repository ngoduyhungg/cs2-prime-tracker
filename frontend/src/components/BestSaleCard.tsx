import type { Item } from "../types/item";

type BestSaleCardProps = {
    items: Item[];
};

function formatUsd(value: number) {
    return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
    })}`;
}

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

type BestSaleIconProps = {
    item: Item;
};

function BestSaleIcon({ item }: BestSaleIconProps) {
    if (item.imageUrl) {
        return (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 p-2">
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
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-base font-bold ${getTypeStyle(
                item.itemType
            )}`}
        >
            {getTypeShortName(item.itemType)}
        </div>
    );
}

function BestSaleCard({ items }: BestSaleCardProps) {
    const soldItems = items.filter(
        (item) => item.sold && item.receivedUsd !== null
    );

    const bestSale = soldItems.reduce<Item | null>((bestItem, currentItem) => {
        if (!bestItem) {
            return currentItem;
        }

        const currentReceivedUsd = currentItem.receivedUsd ?? 0;
        const bestReceivedUsd = bestItem.receivedUsd ?? 0;

        return currentReceivedUsd > bestReceivedUsd ? currentItem : bestItem;
    }, null);

    if (!bestSale) {
        return (
            <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                            Best Sale
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-slate-100">
                            Chưa có vật phẩm đã bán
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Khi bạn bán item đầu tiên, card này sẽ hiển thị item có tiền thực nhận cao nhất.
                        </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
                        💰
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                    <BestSaleIcon item={bestSale} />

                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                            Best Sale
                        </p>

                        <h2 className="mt-2 truncate text-xl font-bold text-slate-100">
                            {bestSale.itemName}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {bestSale.itemType} · Tuần {bestSale.weekNumber} ·{" "}
                            {bestSale.receivedDate}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:min-w-[320px]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Tiền thực nhận cao nhất
                        </p>

                        <p className="mt-1 text-2xl font-bold text-emerald-300">
                            {formatUsd(bestSale.receivedUsd ?? 0)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Giá trị tham khảo
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-100">
                            {formatUsd(bestSale.valueUsd)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BestSaleCard;