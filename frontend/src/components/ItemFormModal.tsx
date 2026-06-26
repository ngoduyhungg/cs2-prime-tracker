import { Form, Modal, Input, InputNumber, DatePicker, Select, Switch } from "antd";
import type { Dayjs } from "dayjs";
import type { CreateItemPayload } from "../types/item";

type ItemFormModalProps = {
    open: boolean;
    selectedWeekNumber?: number;
    onClose: () => void;
    onSubmit: (payload: CreateItemPayload) => Promise<void>;
};

type ItemFormValues = {
    receivedDate: Dayjs;
    itemName: string;
    itemType: string;
    valueUsd: number;
    sold: boolean;
    receivedUsd?: number;
};

const itemTypeOptions = [
    { label: "Case", value: "Case" },
    { label: "Skin", value: "Skin" },
    { label: "Graffiti", value: "Graffiti" },
    { label: "Sticker", value: "Sticker" },
    { label: "Other", value: "Other" },
];

function ItemFormModal({
    open,
    selectedWeekNumber,
    onClose,
    onSubmit,
}: ItemFormModalProps) {
    const [form] = Form.useForm();
    const sold = Form.useWatch("sold", form);
    const isSold = Boolean(sold);

    const handleFinish = async (values: ItemFormValues) => {
        const payload: CreateItemPayload = {
            receivedDate: values.receivedDate.format("YYYY-MM-DD"),
            itemName: values.itemName,
            itemType: values.itemType,
            valueUsd: values.valueUsd,
            sold: values.sold,
            receivedUsd: values.sold ? values.receivedUsd ?? null : null,
        };

        await onSubmit(payload);
        form.resetFields();
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            closable={false}
            okText="Thêm vật phẩm"
            cancelText="Hủy"
            width={620}
            className="
                [&_.ant-modal-content]:!overflow-hidden
                [&_.ant-modal-content]:!rounded-3xl
                [&_.ant-modal-content]:!bg-white
                [&_.ant-modal-content]:!p-0
                [&_.ant-modal-header]:!m-0
                [&_.ant-modal-header]:!bg-transparent
                [&_.ant-modal-header]:!p-0
                [&_.ant-modal-body]:!px-7
                [&_.ant-modal-body]:!pt-6
                [&_.ant-modal-body]:!pb-2
                [&_.ant-modal-footer]:!px-7
                [&_.ant-modal-footer]:!pb-7
            "
            okButtonProps={{
                className: "!bg-cyan-500 hover:!bg-cyan-400 !border-cyan-500",
            }}
            cancelButtonProps={{
                className:
                    "!border-slate-600 !bg-slate-800 !text-slate-200 hover:!bg-slate-700",
            }}
            title={
                <div className="relative bg-slate-900 px-7 py-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
                    >
                        ✕
                    </button>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        New Drop
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-100">
                        {selectedWeekNumber
                            ? `Thêm vật phẩm vào Tuần ${selectedWeekNumber}`
                            : "Thêm vật phẩm mới"}
                    </h2>

                    <p className="mt-1 text-sm font-normal text-slate-400">
                        Ghi lại item nhận được, giá trị tham khảo và tiền thực nhận nếu đã bán.
                    </p>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ sold: false, itemType: "Skin" }}
                className="mt-6"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.Item
                        label={<span className="text-slate-700 font-medium">Ngày nhận</span>}
                        name="receivedDate"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ngày nhận",
                            },
                        ]}
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-slate-700 font-medium">Loại vật phẩm</span>}
                        name="itemType"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn loại vật phẩm",
                            },
                        ]}
                    >
                        <Select className="w-full" options={itemTypeOptions} />
                    </Form.Item>
                </div>

                <Form.Item
                    label={<span className="text-slate-700 font-medium">Tên vật phẩm</span>}
                    name="itemName"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên vật phẩm",
                        },
                    ]}
                >
                    <Input placeholder="Ví dụ: M4A4 | Steel Work" />
                </Form.Item>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.Item
                        label={<span className="text-slate-700 font-medium">Giá trị tham khảo ($)</span>}
                        name="valueUsd"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá trị vật phẩm",
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            step={0.001}
                            precision={6}
                            className="w-full"
                            placeholder="0.059"
                        />
                    </Form.Item>

                    {isSold ? (
                        <Form.Item
                            label={<span className="text-slate-700 font-medium">Tiền thực nhận ($)</span>}
                            name="receivedUsd"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số tiền nhận được",
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                                step={0.001}
                                precision={6}
                                className="w-full"
                                placeholder="0.050"
                            />
                        </Form.Item>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
                            <p className="text-sm font-medium text-slate-700">
                                Tiền thực nhận
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Chỉ nhập sau khi item đã bán.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <Form.Item
                        label={<span className="text-slate-300">Tình trạng bán</span>}
                        name="sold"
                        valuePropName="checked"
                        className="mb-0"
                    >
                        <Switch checkedChildren="Đã bán" unCheckedChildren="Chưa bán" />
                    </Form.Item>

                    <p className="mt-2 text-xs text-slate-500">
                        Thống kê hoàn vốn chỉ tính bằng tiền thực nhận của item đã bán.
                    </p>
                </div>
            </Form>
        </Modal>
    );
}

export default ItemFormModal;