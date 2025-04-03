import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar/navBar.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ProductList from "./Components/productList.js";
import CategoryFilter from "./Components/categoryFilter.js";
import Cart from "./Components/cart.js";
import ItemDetailContainer from "./Components/ItemDetailContainer.js"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useEffect, useState } from "react";
import OrderSuccess from "./Components/OrderSuccess.js";
import Checkout from "./Components/checkout.js";


function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
            const uniqueCategories = [...new Set(productList.map((product) => product.category))];
            setCategories(uniqueCategories);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const isProductInCart = prevCart.find((item) => item.id === product.id);
            if (isProductInCart) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <Router>
            <div>
                <Navbar cart={cart} /> 
                <h1>Emma Wine's</h1>
                <CategoryFilter categories={categories} setSelectedCategory={setSelectedCategory} />
                <Routes>
                    <Route path="/" element={<ProductList products={products} selectedCategory={selectedCategory} addToCart={addToCart} />} />
                    <Route path="/categoria/vinos" element={<ProductList products={products} selectedCategory={selectedCategory} addToCart={addToCart} />} />
                    <Route path="/producto/:id" element={<ItemDetailContainer onAddToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
                    <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                    <Route path="/category/:categoryName" element={<ProductList products={products} addToCart={addToCart} />} />
                    <Route path="/checkout" element={<Checkout cart={cart} />} />
                    </Routes>
            </div>
        </Router>
    );
}

export default App;