import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Cart = ({ cart }) => {
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
            <h2>Carrito de Compras</h2>
            {/* Aquí se mostrarán los productos en el carrito */}
        </div>
    );
};

export default Cart;

