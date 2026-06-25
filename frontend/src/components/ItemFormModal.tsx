import { Form, Modal, Input, InputNumber, DatePicker, Select, Switch } from "antd";
import type { Dayjs } from "dayjs";
import type { CreateItemPayload } from "../types/item";

type ItemFormModalProps = {
    open: boolean;
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

function ItemFormModal({open, onClose, onSubmit} : ItemFormModalProps){
    const [form] = Form.useForm();
    const sold = Form.useWatch("sold", form);
    const handleFinish = async (values: ItemFormValues) => {
        const payload: CreateItemPayload = {
            receivedDate: values.receivedDate.format("YYYY-MM-DD"),
            itemName: values.itemName,
            itemType: values.itemType,
            valueUsd: values.valueUsd,
            sold: values.sold,
            receivedUsd: values.sold? values.receivedUsd ?? null : null,
        };
        await onSubmit(payload);
        form.resetFields();
    };
    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (<Modal title="Thêm vật phẩm mới" 
                open={open} onCancel={handleCancel} onOk={() => form.submit()} okText="Thêm" cancelText="Hủy">
                <Form form={form} onFinish={handleFinish} initialValues={{sold: false, itemType: "Skin"}}>
                    <Form.Item label="Ngày nhận" name="receivedDate" rules={[{ required: true, message: "Vui lòng nhập ngày nhận" }]}> 
                        <DatePicker /> 
                    </Form.Item>
                    <Form.Item label="Vật phẩm" name="itemName" rules={[{ required: true, message: "Vui lòng nhập tên vật phẩm" }]}> 
                        <Input /> 
                    </Form.Item>
                    <Form.Item label="Loại" name="itemType" rules={[{ required: true, message: "Vui lòng chọn loại vật phẩm" }]}> 
                        <Select options={[
                            { label: "Case", value: "Case" },
                            { label: "Skin", value: "Skin" },
                            { label: "Graffiti", value: "Graffiti" },
                            { label: "Sticker", value: "Sticker" },
                            { label: "Other", value: "Other" }, ]}/> 
                    </Form.Item>
                    <Form.Item label="Giá trị" name="valueUsd" rules={[{ required: true, message: "Vui lòng nhập giá trị vật phẩm" }]}> 
                        <InputNumber /> 
                    </Form.Item>
                    <Form.Item label="Đã bán?" name="sold" valuePropName="checked"> 
                        <Switch /> 
                    </Form.Item>
                    {sold && <Form.Item label="Tiền nhận được" name="receivedUsd" rules={[{ required: true, message: "Vui lòng nhập số tiền nhận được" }]}> 
                        <InputNumber /> 
                    </Form.Item>}
                </Form>
            </Modal>
    )
}

export default ItemFormModal;