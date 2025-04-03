import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buyer.name || !buyer.email || !buyer.phone) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!validateEmail(buyer.email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        if (!validatePhone(buyer.phone)) {
            setError("Por favor, introduce un número de teléfono válido.");
            return;
        }

        setError(""); // Reseteamos errores antes de continuar

        const order = {
            buyer,
            items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
            total: cartTotal, // Ahora se usa correctamente como variable
            date: new Date(),
        };

        try {
            const db = getFirestore();
            const ordersCollection = collection(db, "orders");
            const docRef = await addDoc(ordersCollection, order);
            setOrderId(docRef.id);
            clearCart();
        } catch (error) {
            console.error("Error al generar la orden:", error);
            setError("Hubo un problema con tu compra. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="checkout">
            <h2>Finalizar Compra</h2>
            {orderId ? (
                <p>¡Gracias por tu compra! Tu número de orden es: <strong>{orderId}</strong></p>
            ) : (
                <>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Nombre" value={buyer.name} onChange={handleInputChange} required />
                        <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={handleInputChange} required />
                        <input type="tel" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} required />
                        <button type="submit">Confirmar compra</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;
