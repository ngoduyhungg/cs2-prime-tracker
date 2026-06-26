import type { PrimeWeek } from "../types/week";
import type { Item } from "../types/item";

import ItemTable from "./ItemTable";
import ItemActions from "./ItemActions";
import { useState } from "react";
import { Button} from "antd";

//import { Card } from "antd";

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
            <Button type="primary" onClick={ handleSaveEdit }>
                Lưu
            </Button>
            <Button onClick={ handleCancelEdit }>
                Hủy
            </Button>
        </>
    ) : (
        <>
            <ItemActions label="+ Thêm vật phẩm" onAddClick={() => onAddItemClick(week.id)}/>
            <Button onClick={ handleStartEdit }> Chỉnh sửa </Button>
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

                <p className="mt-1 text-sm text-slate-400">
                    {displayedItems.length} vật phẩm đang được theo dõi trong tuần này
                </p>
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