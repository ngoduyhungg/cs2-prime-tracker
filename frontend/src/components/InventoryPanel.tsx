import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

import type { Item } from "../types/item";
import ItemIcon from "./ItemIcon";
import { formatUsd } from "../utils/formatCurrency";
import { getItemTypeVisual } from "../utils/itemVisuals";
import { getDisplayItemName, getWearInfo } from "../utils/itemWear";

type InventoryPanelProps = {
    items: Item[];
};

const ITEMS_PER_PAGE = 20;

function InventoryPanel({ items }: InventoryPanelProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const sortedItems = useMemo(() => {
        return [...items].sort((firstItem, secondItem) => {
            const dateCompare = secondItem.receivedDate.localeCompare(
                firstItem.receivedDate
            );

            if (dateCompare !== 0) {
                return dateCompare;
            }

            return secondItem.id - firstItem.id;
        });
    }, [items]);

    const totalPages = Math.max(
        1,
        Math.ceil(sortedItems.length / ITEMS_PER_PAGE)
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const visibleItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        
        return sortedItems.slice(startIndex, endIndex);
    }, [sortedItems, currentPage]);

    const totalValueUsd = items.reduce(
        (total, item) => total + item.valueUsd,
        0
    );

    const totalReceivedUsd = items.reduce(
        (total, item) => total + (item.receivedUsd ?? 0),
        0
    );

    const soldItemCount = items.filter((item) => item.sold).length;
    const unsoldItemCount = items.length - soldItemCount;

    return (
        <section className="rgb-border-card rgb-border-card-soft rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-5 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        Inventory
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-100">
                        Kho hàng
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-300">
                            {items.length} vật phẩm
                        </span>

                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                            Giá trị {formatUsd(totalValueUsd)}
                        </span>

                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                            Đã nhận {formatUsd(totalReceivedUsd)}
                        </span>

                        <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-300">
                            Đã bán {soldItemCount}
                        </span>

                        <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-300">
                            Chưa bán {unsoldItemCount}
                        </span>
                    </div>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-3">
                        <Button
                            className="!rounded-xl !border-slate-600 !bg-slate-800 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prevPage) =>
                                    Math.max(prevPage - 1, 1)
                                )
                            }
                        >
                            Trước
                        </Button>

                        <span className="rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-300">
                            {currentPage} / {totalPages}
                        </span>

                        <Button
                            className="!rounded-xl !border-slate-600 !bg-slate-800 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prevPage) =>
                                    Math.min(prevPage + 1, totalPages)
                                )
                            }
                        >
                            Sau
                        </Button>
                    </div>
                )}
            </div>

            {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-12 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-2xl">
                        🎒
                    </div>

                    <h3 className="text-base font-semibold text-slate-100">
                        Kho hàng đang trống
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        Thêm vật phẩm đầu tiên để bắt đầu xây kho CS2 của bạn.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                    {visibleItems.map((item) => {
                        const wearInfo = getWearInfo(item.itemName);
                        const displayName = getDisplayItemName(item.itemName);
                        const visual = getItemTypeVisual(item.itemType);

                        return (
                            <article
                                key={item.id}
                                className={`group rounded-3xl border ${visual.borderClass} bg-slate-950/50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 ${visual.hoverBorderClass} hover:bg-slate-950/80 hover:shadow-lg ${visual.glowClass}`}
                            >
                                <div className="flex justify-center">
                                    <ItemIcon item={item} size="md" />
                                </div>

                                <div className="mt-4 min-h-[96px] text-center">
                                    {wearInfo && (
                                        <p
                                            className={`text-xs font-bold ${wearInfo.textClass}`}
                                        >
                                            {wearInfo.label}
                                        </p>
                                    )}

                                    <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-100">
                                        {displayName}
                                    </h3>

                                    <p className={`mt-1 text-xs ${visual.textClass}`}>
                                        {item.itemType} · Tuần {item.weekNumber}
                                    </p>
                                </div>

                                <div className={`mt-4 rounded-2xl border ${visual.borderClass} ${visual.softBgClass} px-3 py-3 text-center`}>
                                    <p className="text-xs text-slate-500">
                                        Giá trị
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-amber-300">
                                        {formatUsd(item.valueUsd)}
                                    </p>
                                </div>

                                <div className="mt-3 flex justify-center">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.sold
                                                ? "bg-emerald-500/10 text-emerald-300"
                                                : "bg-rose-500/10 text-rose-300"
                                        }`}
                                    >
                                        {item.sold ? "Đã bán" : "Chưa bán"}
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default InventoryPanel;