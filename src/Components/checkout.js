import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
    const [orderId, setOrderId] = useState(null);

    const handleInputChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            buyer,
            items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
            total: totalPrice(),
            date: new Date(),
    };

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    try {
        const docRef = await addDoc(ordersCollection, order);
        setOrderId(docRef.id);
        clearCart();
    } catch (error) {
        console.error("Error al procesar la orden", error);
    }
};

return (
    <div className="checkout">
        <h2>Finalizar Compra</h2>
        {orderId ? (
            <p>¡Gracias por tu compra! Tu número de orden es: <strong>{orderId}</strong></p>
            ) : (
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={buyer.name} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={handleInputChange} required />
                <input type="tel" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} required />
                <button type="submit">Confirmar compra</button>
            </form>
        )}
    </div>
    );
};

export default Checkout;
