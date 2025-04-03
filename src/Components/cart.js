import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        try {
            const order = {
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                date: new Date(),
            };

            const orderRef = await addDoc(collection(db, "orders"), order);
            console.log("Pedido guardado con ID:", orderRef.id);

            clearCart(); 
            navigate(`/order-success/${orderRef.id}`); 
        } catch (error) {
            console.error("Error al guardar el pedido:", error);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <FaShoppingCart size={30} />
            {cart.length > 0 && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    fontSize: "12px",
                }}>
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </div>
            )}
            <h2>Carrito</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <img src={item.image} alt={item.name} width="50" height="50" />
                                <span>{item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}</span>
                                <div>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} >+</button>
                                    <button onClick={() => removeFromCart(item.id)}>🗑</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={handleCheckout} 
                        style={{
                            marginTop: "10px",
                            padding: "10px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Finalizar Compra
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;

