import { Button } from "antd";

type Props = {
    onAddClick: () => void;
}

function ItemActions({ onAddClick } : Props){
    return (
        <Button type="primary" onClick={ onAddClick }>+ Tuần mới</Button>
    );
}
export default ItemActions;