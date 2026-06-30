import { useMemo, useState } from "react";
import { AutoComplete, Button, Input, InputNumber, Select, Switch } from "antd";

import type { Item } from "../types/item";
import ItemIcon from "./ItemIcon";
import useItemCatalog from "../hooks/useItemCatalog";
import { formatUsd } from "../utils/formatCurrency";
import { itemTypeOptions } from "../constants/itemTypes";
import { getItemTypeVisual } from "../utils/itemVisuals";
import { getDisplayItemName, getWearInfo } from "../utils/itemWear";

type ItemTableProps = {
    items: Item[];
    isEditing?: boolean;
    onDraftItemChange?: (itemId: number, field: keyof Item, value: unknown) => void;
    onDraftItemDelete?: (itemId: number) => void;
};

function ItemTable({
    items,
    isEditing = false,
    onDraftItemChange,
    onDraftItemDelete,
}: ItemTableProps) {
    const [itemSearchText, setItemSearchText] = useState("");
    const { catalogItems, isLoadingCatalog, catalogError } = useItemCatalog();
    const catalogOptions = useMemo(() => {
        const keyword = itemSearchText.trim().toLowerCase();

        if (!keyword) {
            return [];
        }

        return catalogItems
            .filter((catalogItem) => {
                const name = catalogItem.name.toLowerCase();
                const marketHashName = catalogItem.marketHashName.toLowerCase();
                const itemType = catalogItem.itemType.toLowerCase();

                return (
                    name.includes(keyword) ||
                    marketHashName.includes(keyword) ||
                    itemType.includes(keyword)
                );
            })
            .slice(0, 15)
            .map((catalogItem) => ({
                value: catalogItem.marketHashName,
                label: (
                    <div className="flex items-center gap-3 py-1">
                        {catalogItem.imageUrl ? (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-1">
                                <img
                                    src={catalogItem.imageUrl}
                                    alt={catalogItem.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-500">
                                {catalogItem.itemType.slice(0, 2).toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {catalogItem.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                {catalogItem.itemType}
                            </p>
                        </div>
                    </div>
                ),
            }));
    }, [catalogItems, itemSearchText]); 

    const handleCatalogItemSelect = (
        itemId: number,
        marketHashName: string
    ) => {
        const catalogItem = catalogItems.find(
            (item) => item.marketHashName === marketHashName
        );

        if (!catalogItem) {
            return;
        }

        onDraftItemChange?.(itemId, "itemName", catalogItem.name);
        onDraftItemChange?.(itemId, "itemType", catalogItem.itemType);
        onDraftItemChange?.(itemId, "marketHashName", catalogItem.marketHashName);
        onDraftItemChange?.(itemId, "imageUrl", catalogItem.imageUrl);

        setItemSearchText(catalogItem.name);
    };    

    if (items.length === 0) {
        return (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-2xl">
                    🎁
                </div>

                <h3 className="text-base font-semibold text-slate-100">
                    Chưa có vật phẩm nào trong tuần này
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                    Thêm drop đầu tiên để bắt đầu theo dõi tuần này.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {items.map((item) => {
                const visual = getItemTypeVisual(item.itemType);
                const wearInfo = getWearInfo(item.itemName);
                const displayName = getDisplayItemName(item.itemName);
                return (
                <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 px-5 py-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-950/80"
                >
                    {isEditing ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <ItemIcon item={item} size="sm" />

                                <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2 xl:grid-cols-[260px_220px_220px_130px]">
                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Tên item
                                        </label>
                                        <AutoComplete
                                            value={item.itemName}
                                            className="!w-full"
                                            popupMatchSelectWidth={360}
                                            options={catalogOptions}
                                            showSearch={{
                                                filterOption: false,
                                                onSearch: setItemSearchText,
                                            }}
                                            onSelect={(value) => handleCatalogItemSelect(item.id, value)}
                                            onChange={(value) => {
                                                setItemSearchText(value);

                                                onDraftItemChange?.(item.id, "itemName", value);
                                                onDraftItemChange?.(item.id, "marketHashName", null);
                                                onDraftItemChange?.(item.id, "imageUrl", null);
                                            }}
                                            placeholder={
                                                isLoadingCatalog
                                                    ? "Đang tải catalog CS2..."
                                                    : "Gõ tên item..."
                                            }
                                            notFoundContent={
                                                catalogError
                                                    ? "Không thể tải catalog"
                                                    : itemSearchText
                                                        ? "Không tìm thấy item"
                                                        : "Gõ để tìm item"
                                            }
                                            allowClear
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Ngày nhận
                                        </label>
                                        <Input
                                            type="date"
                                            value={item.receivedDate}
                                            className="!w-full"
                                            onChange={(event) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "receivedDate",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Loại
                                        </label>
                                        <Select
                                            value={item.itemType}
                                            className="!w-full"
                                            onChange={(newValue) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "itemType",
                                                    newValue
                                                )
                                            }
                                            options={itemTypeOptions}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Tình trạng
                                        </label>
                                        <Switch
                                            checked={item.sold}
                                            checkedChildren="Đã bán"
                                            unCheckedChildren="Chưa bán"
                                            onChange={(checked) => {
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "sold",
                                                    checked
                                                );

                                                if (!checked) {
                                                    onDraftItemChange?.(
                                                        item.id,
                                                        "receivedUsd",
                                                        null
                                                    );
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Giá trị tham khảo
                                        </label>
                                        <InputNumber
                                            min={0}
                                            step={0.001}
                                            value={item.valueUsd}
                                            className="!w-full"
                                            onChange={(newValue) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "valueUsd",
                                                    newValue ?? 0
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Tiền đã nhận
                                        </label>
                                        <InputNumber
                                            min={0}
                                            step={0.001}
                                            value={item.receivedUsd}
                                            disabled={!item.sold}
                                            className="w-full"
                                            onChange={(newValue) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "receivedUsd",
                                                    newValue
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <Button
                                    danger
                                    type="text"
                                    className="!rounded-full !text-rose-400 hover:!bg-rose-500/10 hover:!text-rose-300"
                                    onClick={() => onDraftItemDelete?.(item.id)}
                                >
                                    ✕
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px_96px] md:items-center">
                            <div className="flex min-w-0 items-center gap-4">
                                <ItemIcon item={item} size="sm" />

                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-bold text-slate-100">
                                        {displayName}
                                    </h3>
                                    {wearInfo && (
                                        <span
                                            className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${wearInfo.borderClass} ${wearInfo.bgClass} ${wearInfo.textClass}`}
                                        >
                                            {wearInfo.label}
                                        </span>
                                    )}
                                    <p className={`mt-1 text-sm ${visual.textClass}`}>
                                        {item.itemType} · {item.receivedDate}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:w-[300px]">
                                <div className={`rounded-2xl border ${visual.borderClass} ${visual.softBgClass} px-4 py-3`}>
                                    <p className="text-xs text-slate-500">
                                        Giá trị
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-100">
                                        {formatUsd(item.valueUsd)}
                                    </p>
                                </div>

                                <div className={`rounded-2xl border ${visual.borderClass} bg-slate-900/70 px-4 py-3`}>
                                    <p className="text-xs text-slate-500">
                                        Đã nhận
                                    </p>
                                    <p
                                        className={`mt-1 font-semibold ${
                                            item.receivedUsd === null
                                                ? "text-slate-500"
                                                : "text-emerald-300"
                                        }`}
                                    >
                                        {formatUsd(item.receivedUsd)}
                                    </p>
                                </div>
                            </div>

                            <div className="md:flex md:justify-end">
                                <span
                                    className={`inline-flex min-w-[74px] justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                                        item.sold
                                            ? "bg-emerald-500/10 text-emerald-300"
                                            : "bg-rose-500/10 text-rose-300"
                                    }`}
                                >
                                    {item.sold ? "Đã bán" : "Chưa bán"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                );
            })}
        </div>
    );
}

export default ItemTable;