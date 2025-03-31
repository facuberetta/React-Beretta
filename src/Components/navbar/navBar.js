import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/navBar.css";

const NavBar = ({ cart }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categoria/vinos">Vinos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li>
          <Link to="/cart" style={{ position: "relative" }}>
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  fontSize: "12px",
                }}
              >
                {cart.length}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

