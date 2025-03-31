import { useState, useEffect } from "react";

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
    const [quantity, setQuantity] = useState(() => {
        const validInitial = !isNaN(initial) && initial > 0 ? initial : 1;
        return Math.min(validInitial, stock);
    });

    const increase = () => {
        setQuantity((prev) => Math.min(prev + 1, stock));
    };

    const decrease = () => {
        setQuantity((prev) => Math.max(prev - 1, 1));
    };

    useEffect(() => {
        setQuantity((prev) => Math.min(prev, stock || 1));
    }, [stock]);

    return (
        <div className="item-count">
            <button onClick={decrease}>-</button>
            <span>{isNaN(quantity) ? 0 : quantity}</span>
            <button onClick={increase}>+</button>
            <button onClick={() => onAdd(quantity)}>Agregar al carrito</button>
        </div>
    );
};

export default ItemCount;
