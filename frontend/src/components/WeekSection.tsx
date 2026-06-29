import type { PrimeWeek } from "../types/week";
import type { Item } from "../types/item";

import ItemTable from "./ItemTable";
import ItemActions from "./ItemActions";
import { useState } from "react";
import { Button} from "antd";

import { formatUsd } from "../utils/formatCurrency";

type WeekSectionProps = {
    week: PrimeWeek,
    items: Item[],
    onAddItemClick: (weekId: number) => void,
    onSaveWeekItems: (originalItems: Item[], draftItems: Item[]) => Promise<void>
}



function WeekSection({ week, items, onAddItemClick, onSaveWeekItems} : WeekSectionProps){
    const [isEditing, setIsEditing] = useState(false);
    const [draftItems, setDraftItems] = useState<Item[]>([])
    
    const handleStartEdit = () => {
        setDraftItems(items.map((item) => ({...item})));
        setIsEditing(true);
    }
    const handleCancelEdit = () => {
        setDraftItems([]);
        setIsEditing(false);
    }
    const handleSaveEdit = async () => {
        await onSaveWeekItems(items, draftItems);
        setDraftItems([]);
        setIsEditing(false);
    }

    const displayedItems = isEditing ? draftItems : items;
    const totalValueUsd = displayedItems.reduce(
        (total, item) => total + item.valueUsd,
        0
    );

    const totalReceivedUsd = displayedItems.reduce(
        (total, item) => total + (item.receivedUsd ?? 0),
        0
    );

    const soldItemCount = displayedItems.filter((item) => item.sold).length;

    const handleDraftItemChange = (
        itemId: number,
        field: keyof Item,
        value: unknown
    ) => {
        setDraftItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? {...item, [field]: value} : item
            )
        );
    };
    const handleDraftItemDelete = (itemId: number) => {
        setDraftItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    const tableActions = isEditing ? (
        <>
            <Button
                type="primary"
                className="!rounded-xl !border-emerald-500 !bg-emerald-500 !px-4 !font-semibold hover:!border-emerald-400 hover:!bg-emerald-400"
                onClick={handleSaveEdit}
            >
                Lưu
            </Button>

            <Button
                className="!rounded-xl !border-slate-600 !bg-slate-800 !px-4 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                onClick={handleCancelEdit}
            >
                Hủy
            </Button>
        </>
    ) : (
        <>
            <ItemActions label="+ Thêm vật phẩm" onAddClick={() => onAddItemClick(week.id)}/>
            <Button
                className="!rounded-xl !border-slate-600 !bg-slate-800 !px-4 !font-semibold !text-slate-100 hover:!border-slate-500 hover:!bg-slate-700"
                onClick={handleStartEdit}
            >
                Chỉnh sửa
            </Button>
        </>
    );

    return(
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm transition-all duration-200 hover:border-slate-700">
        <div className="mb-5 flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Weekly Drop
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-100">
                    Tuần {week.weekNumber}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-300">
                    {displayedItems.length} vật phẩm
                </span>

                <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-slate-300">
                    Đã bán {soldItemCount}/{displayedItems.length}
                </span>

                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                    Giá trị {formatUsd(totalValueUsd)}
                </span>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    Đã nhận {formatUsd(totalReceivedUsd)}
                </span>
            </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {tableActions}
            </div>
        </div>

        <ItemTable
            items={displayedItems}
            isEditing={isEditing}
            onDraftItemChange={handleDraftItemChange}
            onDraftItemDelete={handleDraftItemDelete}
        />
    </section>
    );
};

export default WeekSection;