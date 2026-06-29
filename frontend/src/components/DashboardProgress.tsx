import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

import ItemActions from "./ItemActions";
import WeekSection from "./WeekSection";

import type { Item } from "../types/item";
import type { PrimeWeek } from "../types/week";
import { itemTypeFilterOptions, type ItemTypeFilter } from "../constants/itemTypes";

type DashboardProgressProps = {
    weeks: PrimeWeek[];
    items: Item[];
    onCreateWeek: () => Promise<void>;
    onAddItemClick: (weekId: number) => void;
    onSaveWeekItems: (originalItems: Item[], draftItems: Item[]) => Promise<void>;
};

const WEEKS_PER_PAGE = 2;

type SoldFilter = "all" | "sold" | "unsold";

const soldFilterOptions: { label: string; value: SoldFilter }[] = [
    { label: "Tất cả", value: "all" },
    { label: "Đã bán", value: "sold" },
    { label: "Chưa bán", value: "unsold" },
];

function DashboardProgress({
    weeks,
    items,
    onCreateWeek,
    onAddItemClick,
    onSaveWeekItems,
}: DashboardProgressProps) {
    const [showProgress, setShowProgress] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [soldFilter, setSoldFilter] = useState<SoldFilter>("all");
    const [itemTypeFilter, setItemTypeFilter] = useState<ItemTypeFilter>("all");
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    const isFiltering = normalizedKeyword.length > 0 || soldFilter !== "all" || itemTypeFilter !== "all";

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const itemName = item.itemName.toLowerCase();
            const itemType = item.itemType.toLowerCase();
            const receivedDate = item.receivedDate.toLowerCase();

            const matchesSearch =
                !normalizedKeyword ||
                itemName.includes(normalizedKeyword) ||
                itemType.includes(normalizedKeyword) ||
                receivedDate.includes(normalizedKeyword);

            const matchesSoldFilter =
                soldFilter === "all" ||
                (soldFilter === "sold" && item.sold) ||
                (soldFilter === "unsold" && !item.sold);
            
            const matchesItemTypeFilter = itemTypeFilter === "all" || item.itemType === itemTypeFilter;

            return matchesSearch && matchesSoldFilter && matchesItemTypeFilter;
        });
    }, [items, normalizedKeyword, soldFilter, itemTypeFilter]);

    const filteredWeeks = useMemo(() => {
        if (!isFiltering) {
            return weeks;
        }

        const matchedWeekIds = new Set(
            filteredItems.map((item) => item.weekId)
        );

        return weeks.filter((week) => matchedWeekIds.has(week.id));
    }, [weeks, filteredItems, isFiltering]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredWeeks.length / WEEKS_PER_PAGE)
    );
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);
    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedKeyword, soldFilter, itemTypeFilter]);

    const visibleWeeks = useMemo(() => {
        const startIndex = (currentPage - 1) * WEEKS_PER_PAGE;
        const endIndex = startIndex + WEEKS_PER_PAGE;

        return filteredWeeks.slice(startIndex, endIndex);
    }, [filteredWeeks, currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap justify-end gap-3">
                <Button
                    className="!rounded-xl !border-slate-600 !bg-slate-800 !px-4 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                    onClick={() => setShowProgress((prev) => !prev)}
                >
                    {showProgress ? "Ẩn tiến trình" : "Xem tiến trình"}
                </Button>

                <ItemActions label="+ Tuần mới" onAddClick={onCreateWeek} />
            </div>

            {showProgress && (
                <div className="space-y-5">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                                    Weekly Progress
                                </p>

                                <h2 className="mt-2 text-xl font-bold text-slate-100">
                                    Tiến trình theo tuần
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    {isFiltering
                                        ? `Tìm thấy ${filteredItems.length} vật phẩm trong ${filteredWeeks.length} tuần`
                                        : `Đang hiển thị ${visibleWeeks.length} / ${weeks.length} tuần`}
                                </p>

                                <div className="mt-4 max-w-md">
                                    <input
                                        type="text"
                                        value={searchKeyword}
                                        onChange={(event) => setSearchKeyword(event.target.value)}
                                        placeholder="Tìm theo tên item, loại hoặc ngày nhận..."
                                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {soldFilterOptions.map((option) => {
                                            const isActive = soldFilter === option.value;

                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setSoldFilter(option.value)}
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                                        isActive
                                                            ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                                                            : "border-slate-700 bg-slate-950/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {itemTypeFilterOptions.map((option) => {
                                            const isActive = itemTypeFilter === option.value;

                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setItemTypeFilter(option.value)}
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                                        isActive
                                                            ? "border-amber-400 bg-amber-500/10 text-amber-300"
                                                            : "border-slate-700 bg-slate-950/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {filteredWeeks.length > WEEKS_PER_PAGE && (
                                <div className="flex items-center gap-3">
                                    <Button
                                        className="!rounded-xl !border-slate-600 !bg-slate-800 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                                        disabled={currentPage === 1}
                                        onClick={handlePreviousPage}
                                    >
                                        Trước
                                    </Button>

                                    <span className="rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-300">
                                        {currentPage} / {totalPages}
                                    </span>

                                    <Button
                                        className="!rounded-xl !border-slate-600 !bg-slate-800 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                                        disabled={currentPage === totalPages}
                                        onClick={handleNextPage}
                                    >
                                        Sau
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {weeks.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
                                📆
                            </div>

                            <h3 className="text-lg font-bold text-slate-100">
                                Chưa có tuần nào
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Tạo tuần mới để bắt đầu theo dõi tiến trình hoàn vốn.
                            </p>
                        </div>
                    ) : filteredWeeks.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
                                🔎
                            </div>

                            <h3 className="text-lg font-bold text-slate-100">
                                Không tìm thấy vật phẩm phù hợp
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Thử tìm bằng tên item, loại item hoặc ngày nhận khác.
                            </p>

                            <Button
                                className="mt-5 !rounded-xl !border-slate-600 !bg-slate-800 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                                onClick={() => {setSearchKeyword(""); setSoldFilter("all"); setItemTypeFilter("all");}}
                            >
                                Xóa bộ lọc
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {visibleWeeks.map((week) => {
                                const weekItems = filteredItems.filter(
                                    (item) => item.weekId === week.id
                                );

                                return (
                                    <WeekSection
                                        key={week.id}
                                        week={week}
                                        items={weekItems}
                                        onAddItemClick={onAddItemClick}
                                        onSaveWeekItems={onSaveWeekItems}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default DashboardProgress;