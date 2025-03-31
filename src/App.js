import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar/navBar.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ProductList from "./Components/productList.js";
import CategoryFilter from "./Components/categoryFilter.js";
import Cart from "./Components/cart";
import ItemDetailContainer from "./Components/ItemDetailContainer.js"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useEffect, useState } from "react";

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

    return (
<Router>
    <div>
        <Navbar cart={cart} /> {/* Pasamos cart como prop */}
        <h1>Emma Wine's</h1>
        <CategoryFilter categories={categories} setSelectedCategory={setSelectedCategory} />
        <Routes>
            <Route path="/" element={<ProductList products={products} selectedCategory={selectedCategory} addToCart={addToCart} />} />
            <Route path="/categoria/vinos" element={<ProductList products={products} selectedCategory={selectedCategory} addToCart={addToCart} />} />
            <Route path="/producto/:id" element={<ItemDetailContainer onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
    </div>
</Router>
    );
}

export default App;
