import { Button } from "antd";

type ItemActionProps = {
    label?: string;
    onAddClick: () => void;
}

function ItemActions({ label= "+ Thêm vật phẩm mới",onAddClick } : ItemActionProps){
    return (
        <Button type="primary" className="!rounded-xl !border-cyan-500 !bg-cyan-500 !px-4 !font-semibold hover:!border-cyan-400 hover:!bg-cyan-400" onClick={ onAddClick }> 
            { label }
        </Button>
    );
}
export default ItemActions;