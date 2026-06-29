import { Button, Input, InputNumber, Select, Switch } from "antd";
import type { Item } from "../types/item";

type ItemTableProps = {
    items: Item[];
    isEditing?: boolean;
    onDraftItemChange?: (itemId: number, field: keyof Item, value: unknown) => void;
    onDraftItemDelete?: (itemId: number) => void;
};

const itemTypeOptions = [
    { label: "Case", value: "Case" },
    { label: "Skin", value: "Skin" },
    { label: "Graffiti", value: "Graffiti" },
    { label: "Sticker", value: "Sticker" },
    { label: "Other", value: "Other" },
];

function formatUsd(value: number | null) {
    if (value === null) {
        return "—";
    }

    return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
    })}`;
}

function getTypeStyle(itemType: string) {
    switch (itemType) {
        case "Case":
            return "border-amber-500/20 bg-amber-500/10 text-amber-300";
        case "Skin":
            return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300";
        case "Graffiti":
            return "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300";
        case "Sticker":
            return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
        default:
            return "border-slate-600/30 bg-slate-700/30 text-slate-300";
    }
}

function getTypeShortName(itemType: string) {
    switch (itemType) {
        case "Case":
            return "CA";
        case "Skin":
            return "SK";
        case "Graffiti":
            return "GR";
        case "Sticker":
            return "ST";
        default:
            return "OT";
    }
}

function ItemTable({
    items,
    isEditing = false,
    onDraftItemChange,
    onDraftItemDelete,
}: ItemTableProps) {
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
            {items.map((item) => (
                <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 px-5 py-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-950/80"
                >
                    {isEditing ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold ${getTypeStyle(
                                        item.itemType
                                    )}`}
                                >
                                    {getTypeShortName(item.itemType)}
                                </div>

                                <div className="grid flex-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Tên item
                                        </label>
                                        <Input
                                            value={item.itemName}
                                            onChange={(event) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "itemName",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Ngày nhận
                                        </label>
                                        <Input
                                            type="date"
                                            value={item.receivedDate}
                                            onChange={(event) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "receivedDate",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Loại
                                        </label>
                                        <Select
                                            value={item.itemType}
                                            className="w-full"
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

                                    <div>
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

                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-400">
                                            Giá trị tham khảo
                                        </label>
                                        <InputNumber
                                            min={0}
                                            step={0.001}
                                            value={item.valueUsd}
                                            className="w-full"
                                            onChange={(newValue) =>
                                                onDraftItemChange?.(
                                                    item.id,
                                                    "valueUsd",
                                                    newValue ?? 0
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
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
                                <div
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold ${getTypeStyle(
                                        item.itemType
                                    )}`}
                                >
                                    {getTypeShortName(item.itemType)}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-bold text-slate-100">
                                        {item.itemName}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        {item.itemType} · {item.receivedDate}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:w-[300px]">
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                                    <p className="text-xs text-slate-500">
                                        Giá trị
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-100">
                                        {formatUsd(item.valueUsd)}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
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
            ))}
        </div>
    );
}

export default ItemTable;