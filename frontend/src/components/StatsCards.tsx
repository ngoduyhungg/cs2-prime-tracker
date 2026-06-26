import { Skeleton } from "antd";
import type { Stats } from "../types/stats";

type StatsProps = {
    stats: Stats | null;
};

function formatUsd(value: number) {
    const sign = value < 0 ? "-" : "";
    const absValue = Math.abs(value);

    return `${sign}$${absValue.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
    })}`;
}

function formatPercent(value: number) {
    return `${value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}%`;
}

function StatsCards({ stats }: StatsProps) {
    if (!stats) {
        return (
            <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm"
                    >
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                ))}
            </section>
        );
    }

    const progressWidth = Math.min(Math.max(stats.progress, 0), 100);

    const cards = [
        {
            title: "Giá Prime",
            value: formatUsd(stats.primeCost),
            subtitle: "Chi phí ban đầu để mua Prime",
            icon: "$",
            iconClass: "bg-amber-500/10 text-amber-300",
            valueClass: "text-slate-50",
        },
        {
            title: "Đã hoàn vốn",
            value: formatUsd(stats.recovered),
            subtitle: "Chỉ tính item đã bán",
            icon: "↗",
            iconClass: "bg-emerald-500/10 text-emerald-300",
            valueClass: "text-emerald-300",
        },
        {
            title: "Còn lại",
            value: formatUsd(stats.remaining),
            subtitle: "Số tiền còn thiếu để hòa vốn",
            icon: "⌛",
            iconClass: "bg-rose-500/10 text-rose-300",
            valueClass: "text-rose-300",
        },
        {
            title: "Tiến độ",
            value: formatPercent(stats.progress),
            subtitle: "Tỷ lệ hoàn vốn hiện tại",
            icon: "%",
            iconClass: "bg-cyan-500/10 text-cyan-300",
            valueClass: "text-cyan-300",
            isProgress: true,
        },
    ];

    return (
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${card.iconClass}`}
                        >
                            {card.icon}
                        </div>

                        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                            Tracker
                        </span>
                    </div>

                    <p className="text-sm font-medium text-slate-400">
                        {card.title}
                    </p>

                    <h3 className={`mt-2 text-3xl font-bold ${card.valueClass}`}>
                        {card.value}
                    </h3>

                    <p className="mt-3 text-sm text-slate-500">
                        {card.subtitle}
                    </p>

                    {card.isProgress && (
                        <div className="mt-5">
                            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                                    style={{ width: `${progressWidth}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}

export default StatsCards;