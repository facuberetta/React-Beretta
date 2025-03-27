import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ id, name, image, description, price, stock, onAddToCart }) => {

const handleAdd = (quantity) => {
        onAddToCart({ id, name, price, quantity });
    };

    return (
        <div className="item-detail">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <h3>${price}</h3>
            <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
        </div>
    );
};

export default ItemDetail;
