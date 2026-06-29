import { useEffect, useState } from "react";
import { message } from "antd";
import { getItems, createItemInWeek, updateItem, deleteItem } from "../api/itemApi";
import { getStats } from "../api/statsApi";
import type { CreateItemPayload, Item } from "../types/item";
import type { Stats } from "../types/stats";
import { getWeeks, createWeek } from "../api/weekApi";
import type { PrimeWeek } from "../types/week";

function usePrimeDashboard() {
    const [items, setItems] = useState<Item[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [weeks, setWeeks] = useState<PrimeWeek[]>([]);
    const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);

    const fetchDashboardData = async () => {
        return Promise.all([getWeeks(), getItems(), getStats()]);
    }

    const reloadDashboardData = async () => {
        const [weeksData, itemsData, statsData] = await fetchDashboardData();

        setWeeks(weeksData);
        setItems(itemsData);
        setStats(statsData);
    };

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                await reloadDashboardData();
            } catch {
                message.error("Không thể tải dữ liệu dashboard");
            }
        };

        loadDashboardData();
    }, []);

    const handleAddItemClick = (weekId: number) => {
        setSelectedWeekId(weekId);
        setIsAddModalOpen(true);
    }

    const handleCreateItem = async (payload: CreateItemPayload) => {
        if (selectedWeekId == null) {
            message.error("Không tìm thấy tuần để thêm vật phẩm");
            return;
        }

        try {
            await createItemInWeek(selectedWeekId, payload);
            await reloadDashboardData();

            setIsAddModalOpen(false);
            setSelectedWeekId(null);

            message.success("Đã thêm vật phẩm thành công");
        } catch {
            message.error("Không thể thêm vật phẩm");
            throw new Error("Failed to create item");
        }
    };

    const handleSaveWeekItems = async (
        originalItems: Item[],
        draftItems: Item[]
    ) => {
        try {
            const draftItemIds = draftItems.map((item) => item.id);

            const deleteItems = originalItems.filter(
                (item) => !draftItemIds.includes(item.id)
            );

            await Promise.all(
                deleteItems.map((item) => deleteItem(item.id))
            );

            await Promise.all(
                draftItems.map((item) =>
                    updateItem(item.id, {
                        receivedDate: item.receivedDate,
                        itemName: item.itemName,
                        itemType: item.itemType,
                        marketHashName: item.marketHashName,
                        imageUrl: item.imageUrl,
                        valueUsd: item.valueUsd,
                        sold: item.sold,
                        receivedUsd: item.sold ? item.receivedUsd : null,
                    })
                )
            );

            await reloadDashboardData();

            message.success("Đã lưu thay đổi thành công");
        } catch {
            message.error("Không thể lưu thay đổi");
            throw new Error("Failed to save week items");
        }
    };

    const handleAddNewWeek = async () => {
        try {
            await createWeek();
            await reloadDashboardData();

            message.success("Đã tạo tuần mới");
        } catch {
            message.error("Không thể tạo tuần mới");
        }
    };
    const handleCloseAddModal = () => { setIsAddModalOpen(false); setSelectedWeekId(null)};
    return{
        items,
        stats,
        weeks,
        selectedWeekId,
        isAddModalOpen,
        handleCreateItem,
        handleAddNewWeek,
        handleAddItemClick,
        handleCloseAddModal,
        handleSaveWeekItems
    }
}
export { usePrimeDashboard }