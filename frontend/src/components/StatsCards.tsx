import { Skeleton } from "antd";
import type { Stats } from "../types/stats";
import { formatUsd } from "../utils/formatCurrency";

type StatsProps = {
    stats: Stats | null;
};

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
            iconClass: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20",
            valueClass: "text-amber-100",
            badgeClass: "border-amber-400/20 bg-amber-400/10 text-amber-200",
            cardClass:
                "border-amber-400/20 bg-[radial-gradient(circle_at_18%_16%,rgba(251,191,36,0.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.82))] hover:border-amber-300/50 hover:shadow-amber-500/10",
        },
        {
            title: "Đã hoàn vốn",
            value: formatUsd(stats.recovered),
            subtitle: "Chỉ tính item đã bán",
            icon: "↗",
            iconClass: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20",
            valueClass: "text-emerald-300",
            badgeClass: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
            cardClass:
                "border-emerald-400/20 bg-[radial-gradient(circle_at_18%_16%,rgba(52,211,153,0.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(6,78,59,0.32))] hover:border-emerald-300/50 hover:shadow-emerald-500/10",
        },
        {
            title: "Còn lại",
            value: formatUsd(stats.remaining),
            subtitle: "Số tiền còn thiếu để hòa vốn",
            icon: "⌛",
            iconClass: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/20",
            valueClass: "text-rose-300",
            badgeClass: "border-rose-400/20 bg-rose-400/10 text-rose-200",
            cardClass:
                "border-rose-400/20 bg-[radial-gradient(circle_at_18%_16%,rgba(251,113,133,0.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(76,5,25,0.35))] hover:border-rose-300/50 hover:shadow-rose-500/10",
        },
        {
            title: "Tiến độ",
            value: formatPercent(stats.progress),
            subtitle: "Tỷ lệ hoàn vốn hiện tại",
            icon: "%",
            iconClass: "bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20",
            valueClass: "text-cyan-300",
            badgeClass: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
            cardClass:
                "border-cyan-400/20 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(8,47,73,0.42))] hover:border-cyan-300/50 hover:shadow-cyan-500/10",
            progressClass: "bg-cyan-300",
            isProgress: true,
        },
    ];

    return (
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${card.cardClass}`}
                >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/5 blur-2xl transition group-hover:bg-white/10" />

                    <div className="relative mb-5 flex items-center justify-between">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${card.iconClass}`}
                        >
                            {card.icon}
                        </div>

                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${card.badgeClass}`}
                        >
                            Tracker
                        </span>
                    </div>

                    <div className="relative">
                        <p className="text-sm font-medium text-slate-300">
                            {card.title}
                        </p>

                        <h3 className={`mt-2 text-3xl font-black ${card.valueClass}`}>
                            {card.value}
                        </h3>

                        <p className="mt-3 text-sm text-slate-400">
                            {card.subtitle}
                        </p>

                        {card.isProgress && (
                            <div className="mt-5">
                                <div className="h-2 overflow-hidden rounded-full bg-slate-950/50">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${card.progressClass}`}
                                        style={{ width: `${progressWidth}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default StatsCards;