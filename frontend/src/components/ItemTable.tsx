import { Card, Table, Tag } from "antd";
import type { Item } from "../types/item";

type ItemTableProps = {
    items: Item[];
    actions?: React.ReactNode;
};

function ItemTable({items, actions}: ItemTableProps){
    return(
        <Card title="Danh sách vật phẩm" extra={ actions } >
            <Table
                className="mt-6" dataSource={items} rowKey="id"
                columns={[
                    { title: "Tuần", dataIndex: "week" },
                    { title: "Ngày nhận", dataIndex: "receivedDate" },
                    { title: "Tên item", dataIndex: "itemName" },
                    { title: "Loại", dataIndex: "itemType" },
                    { title: "Giá trị ($)", dataIndex: "valueUsd" },
                    {
                        title: "Tình trạng",
                        dataIndex: "sold",
                        render: (sold: boolean) => (
                            <Tag color = {sold ? "green" : "red"}> 
                            {sold ? "Đã bán" : "Chưa bán"}
                            </Tag>
                        ),
                    },
                    { title: "Đã nhận ($)", dataIndex: "receivedUsd" },
                ]}
            />
        </Card>
    );
}

export default ItemTable;