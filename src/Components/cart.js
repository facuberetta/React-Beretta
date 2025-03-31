import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";


const Cart = () => {
const { cart, removeFromCart } = useCart(); 

    return (
        <div style={{ position: "relative" }}>
            <FaShoppingCart size={30} /> 
            {cart.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "5px 10px",
                        fontSize: "12px",
                    }}
                >
                    {cart.length}
                </div>
            )}
            <h2>Carrito</h2>
            {cart.length === 0 ? <p>El carrito está vacío</p> : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{item.name} - ${item.price} x {item.quantity}</span>
                            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
