import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
    const { cartTotal } = useContext(CartContext);

    return (
        <Link to="/cart" className="cart-widget">
            🛒
            {cartTotal() > 0 && <span className="cart-count">{cartTotal()}</span>}
        </Link>
    );
};

export default CartWidget;
