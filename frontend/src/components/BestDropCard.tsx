import type { Item } from "../types/item";

import HighlightCard from "./HighlightCard";
import { formatUsd } from "../utils/formatCurrency";

type BestDropCardProps = {
    items: Item[];
    compact?: boolean;
};

function BestDropCard({ items, compact = false }: BestDropCardProps) {
    const bestDrop = items.reduce<Item | null>((bestItem, currentItem) => {
        if (!bestItem) {
            return currentItem;
        }

        return currentItem.valueUsd > bestItem.valueUsd ? currentItem : bestItem;
    }, null);

    return (
        <HighlightCard
            variant="drop"
            label="Best Drop"
            item={bestDrop}
            compact={compact}
            emptyTitle="Chưa có vật phẩm nào"
            emptyDescription="Thêm vật phẩm đầu tiên để bắt đầu ghi nhận drop giá trị cao nhất."
            emptyIcon="🏆"
            primaryMetricLabel="Giá trị cao nhất"
            primaryMetricValue={
                bestDrop ? (
                    <span className="text-2xl font-bold text-amber-300">
                        {formatUsd(bestDrop.valueUsd)}
                    </span>
                ) : null
            }
            secondaryMetricLabel="Trạng thái"
            secondaryMetricValue={
                bestDrop ? (
                    <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            bestDrop.sold
                                ? "bg-emerald-500/10 text-emerald-300"
                                : "bg-rose-500/10 text-rose-300"
                        }`}
                    >
                        {bestDrop.sold ? "Đã bán" : "Chưa bán"}
                    </span>
                ) : null
            }
        />
    );
}

export default BestDropCard;