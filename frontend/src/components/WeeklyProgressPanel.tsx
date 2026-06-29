import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

import WeekSection from "./WeekSection";
import type { PrimeWeek } from "../types/week";
import type { Item } from "../types/item";

type WeeklyProgressPanelProps = {
    weeks: PrimeWeek[];
    items: Item[];
    onAddItemClick: (weekId: number) => void;
    onSaveWeekItems: (originalItems: Item[], draftItems: Item[]) => Promise<void>;
};

const WEEKS_PER_PAGE = 2;

function WeeklyProgressPanel({
    weeks,
    items,
    onAddItemClick,
    onSaveWeekItems,
}: WeeklyProgressPanelProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(weeks.length / WEEKS_PER_PAGE));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const visibleWeeks = useMemo(() => {
        const startIndex = (currentPage - 1) * WEEKS_PER_PAGE;
        const endIndex = startIndex + WEEKS_PER_PAGE;

        return weeks.slice(startIndex, endIndex);
    }, [weeks, currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    if (weeks.length === 0) {
        return (
            <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
                    📆
                </div>

                <h2 className="text-lg font-bold text-slate-100">
                    Chưa có tuần nào
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                    Tạo tuần mới để bắt đầu theo dõi tiến trình hoàn vốn.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-5">
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
                            Đang hiển thị {visibleWeeks.length} / {weeks.length} tuần
                        </p>
                    </div>

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
                </div>
            </div>

            <div className="space-y-6">
                {visibleWeeks.map((week) => {
                    const weekItems = items.filter((item) => item.weekId === week.id);

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
        </section>
    );
}

export default WeeklyProgressPanel;