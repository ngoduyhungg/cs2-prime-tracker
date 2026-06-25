import type { PrimeWeek } from "../types/week";
import type { Item } from "../types/item";

import ItemTable from "./ItemTable";
import ItemActions from "./ItemActions";
import { useState } from "react";
import { Button, Space } from "antd";

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
        <Space>
            <Button type="primary" onClick={ handleSaveEdit }>
                Lưu
            </Button>
            <Button type="primary" onClick={ handleCancelEdit }>
                Hủy
            </Button>
        </Space>
    ) : (
        <Space>
            <ItemActions label="+ Thêm vật phẩm" onAddClick={() => onAddItemClick(week.id)}/>
            <Button onClick={ handleStartEdit }> Chỉnh sửa </Button>
        </Space>
    );

    return(
        <section>
            <ItemTable 
                title={`Tuần ${week.weekNumber}`}
                items={ displayedItems }
                actions={ tableActions }
                isEditing={ isEditing }
                onDraftItemChange={ handleDraftItemChange }
                onDraftItemDelete={ handleDraftItemDelete }
            />
        </section>
    );
};

export default WeekSection;