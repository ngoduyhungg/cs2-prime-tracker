import type { Item } from "../types/item";

import HighlightCard from "./HighlightCard";
import { formatUsd } from "../utils/formatCurrency";

type BestSaleCardProps = {
    items: Item[];
    compact?: boolean;
};

function BestSaleCard({ items, compact=false}: BestSaleCardProps) {
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

    return (
        <HighlightCard
            variant="sale"
            label="Best Sale"
            item={bestSale}
            compact={compact}
            emptyTitle="Chưa có vật phẩm đã bán"
            emptyDescription="Khi bạn bán item đầu tiên, card này sẽ hiển thị item có tiền thực nhận cao nhất."
            emptyIcon="💰"
            primaryMetricLabel="Tiền thực nhận cao nhất"
            primaryMetricValue={
                bestSale ? (
                    <span className="text-2xl font-bold text-emerald-300">
                        {formatUsd(bestSale.receivedUsd)}
                    </span>
                ) : null
            }
            secondaryMetricLabel="Giá trị tham khảo"
            secondaryMetricValue={
                bestSale ? (
                    <span className="text-2xl font-bold text-slate-100">
                        {formatUsd(bestSale.valueUsd)}
                    </span>
                ) : null
            }
        />
    );
}

export default BestSaleCard;