import { Button, Card, Input, InputNumber, Select, Switch, Table, Tag } from "antd";
import type { Item } from "../types/item";
import type { ReactNode } from "react";

type ItemTableProps = {
    title?: string;
    items: Item[];
    actions?: ReactNode;
    isEditing?: boolean;
    onDraftItemChange?: (itemId: number, field: keyof Item, value: unknown) => void;
    onDraftItemDelete?: (itemId: number) => void;
};

function ItemTable({title="Danh sách vật phẩm", items, actions, isEditing = false, onDraftItemChange, onDraftItemDelete}: ItemTableProps){
    return(
        <Card title={ title } extra={ actions } >
            <Table
                className="mt-6" dataSource={items} rowKey="id"
                columns={[
                    {
                        title: "Ngày nhận",
                        dataIndex: "receivedDate",
                        render: (value: string, record: Item) =>
                            isEditing ? (
                                <Input
                                    type= "date"
                                    value={ value }
                                    onChange={ (event) => 
                                        onDraftItemChange?.(record.id, "receivedDate", event.target.value)
                                    }
                                />
                            ) : (
                                value
                            ),
                    },
                    { 
                        title: "Tên item",
                        dataIndex: "itemName",
                        render: (value: string, record: Item) =>
                            isEditing ? (
                                <Input
                                    value={ value }
                                    onChange={ (event) =>
                                        onDraftItemChange?.(record.id, "itemName", event.target.value)
                                    }
                                />
                            ) : (
                                value
                            ),
                    },
                    {
                        title: "Loại",
                        dataIndex: "itemType",
                        render: (value: string, record: Item) =>
                            isEditing ? (
                                <Select
                                    value={ value }
                                    style={{ width: 120 }}
                                    onChange={ (newValue) => 
                                        onDraftItemChange?.(record.id, "itemType", newValue) 
                                    }
                                    options={[
                                        { label: "Case", value: "Case" },
                                        { label: "Skin", value: "Skin" },
                                        { label: "Graffiti", value: "Graffiti" },
                                        { label: "Sticker", value: "Sticker" },
                                        { label: "Other", value: "Other" },
                                    ]}
                                />
                            ) : (
                                value
                            ),
                    },
                    {
                        title: "Giá trị ($)",
                        dataIndex: "valueUsd",
                        render: (value: number, record: Item) =>
                            isEditing ? (
                                <InputNumber
                                    min={ 0 }
                                    value={ value }
                                    onChange={ (newValue) =>
                                        onDraftItemChange?.(record.id, "valueUsd", newValue ?? 0)
                                    }
                                />
                            ) : (
                                value
                            ),
                    },
                    {
                        title: "Tình trạng",
                        dataIndex: "sold",
                        render: (sold: boolean, record: Item) => 
                            isEditing ? (
                            <Switch
                                checked={ sold }
                                checkedChildren="Đã bán"
                                unCheckedChildren="Chưa bán"
                                onChange={ (checked) => {
                                    onDraftItemChange?.(record.id, "sold", checked);

                                    if(!checked){ onDraftItemChange?.(record.id, "receivedUsd", null); }
                                }}
                            />
                        ) : (
                            <Tag color = {sold ? "green" : "red"}> 
                            {sold ? "Đã bán" : "Chưa bán"}
                            </Tag>
                            ),
                    },
                    {
                        title: "Đã nhận ($)",
                        dataIndex: "receivedUsd",
                        render: (value: number | null, record: Item) =>
                            isEditing ? (
                                <InputNumber
                                    min={ 0 }
                                    value={ value }
                                    disabled={ !record.sold }
                                    onChange={ (newValue) => 
                                        onDraftItemChange?.(record.id, "receivedUsd", newValue)
                                    }
                                />
                            ) : (
                                value ?? ""
                            ),
                    },
                    ...(isEditing 
                        ? [
                            {
                                title: "",
                                key: "delete",
                                render: (_: unknown, record: Item) => (
                                    <Button
                                        danger
                                        type="text"
                                        onClick={() => onDraftItemDelete?.(record.id)}
                                    >
                                        X
                                    </Button>
                                ),
                            },
                        ]
                    : []),
                ]}
            />
        </Card>
    );
}

export default ItemTable;