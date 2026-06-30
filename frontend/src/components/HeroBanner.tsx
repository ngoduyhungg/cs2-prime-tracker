import heroImage from "../assets/cs2-hero.png";

import type { Item } from "../types/item";
import type { Stats } from "../types/stats";
import { formatUsd } from "../utils/formatCurrency";

type HeroBannerProps = {
    stats: Stats | null;
    items: Item[];
};

function HeroBanner({ stats, items }: HeroBannerProps) {
    const soldItemCount = items.filter((item) => item.sold).length;

    return (
        <section className="rgb-border-card rgb-border-card-soft relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/80 p-6 shadow-sm md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_35%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.95),rgba(15,23,42,0.78),rgba(15,23,42,0.35))]" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
                <div className="min-w-0">
                    <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        CS2 Prime Dashboard
                    </div>

                    <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-100 md:text-5xl">
                        CS2 Prime Tracker
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                        Theo dõi vật phẩm nhận được từ Prime, quản lý kho skin,
                        tính tiến độ hoàn vốn và highlight những drop giá trị nhất.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3">
                            <p className="text-xs text-slate-500">Prime</p>
                            <p className="mt-1 text-lg font-bold text-slate-100">
                                {stats ? formatUsd(stats.primeCost) : "—"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                            <p className="text-xs text-emerald-200/70">Đã hoàn</p>
                            <p className="mt-1 text-lg font-bold text-emerald-300">
                                {stats ? formatUsd(stats.recovered) : "—"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                            <p className="text-xs text-amber-200/70">Kho</p>
                            <p className="mt-1 text-lg font-bold text-amber-300">
                                {items.length} item
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">
                            <p className="text-xs text-cyan-200/70">Đã bán</p>
                            <p className="mt-1 text-lg font-bold text-cyan-300">
                                {soldItemCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="absolute -inset-6 rounded-[32px] bg-cyan-500/10 blur-3xl" />

                    <div className="relative overflow-hidden rounded-[28px] border border-slate-700 bg-slate-950/40 p-4">
                        <img
                            src={heroImage}
                            alt="CS2 inventory hero"
                            className="h-[260px] w-full rounded-2xl object-cover"
                        />

                        <div className="absolute bottom-6 left-6 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                                Inventory Value
                            </p>

                            <p className="mt-1 text-xl font-black text-slate-100">
                                {formatUsd(
                                    items.reduce(
                                        (total, item) => total + item.valueUsd,
                                        0
                                    )
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;