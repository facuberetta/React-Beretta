import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
    }   catch (error) {
        console.error("Error fetching products:", error);
    }   finally {
        setLoading(false);
    }
    };

    fetchProducts();
}, []);

const addToCart = (product) => {
    setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
        return [...prevCart, { ...product, quantity: 1 }];
    });
};

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, products, loading }}>
        {children}
    </CartContext.Provider>
    );
};