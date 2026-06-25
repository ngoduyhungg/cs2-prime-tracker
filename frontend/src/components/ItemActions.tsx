import { Button } from "antd";

type ItemActionProps = {
    label?: string;
    onAddClick: () => void;
}

function ItemActions({ label= "+ Thêm vật phẩm mới",onAddClick } : ItemActionProps){
    return (
        <Button type="primary" onClick={ onAddClick }> { label }</Button>
    );
}
export default ItemActions;