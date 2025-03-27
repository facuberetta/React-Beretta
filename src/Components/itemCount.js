import { useState, useEffect } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(Math.min(initial, stock));

    const increase = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        setQuantity(Math.min(quantity, stock));
    }, [stock]);

    return (
        <div className="item-count">
            <button onClick={decrease}>-</button>
            <span>{quantity}</span>
            <button onClick={increase}>+</button>
            <button onClick={() => onAdd(quantity)}>Agregar al carrito</button>
        </div>
    );
};

export default ItemCount;
