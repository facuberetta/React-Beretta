import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
    const { orderId } = useParams();

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>¡Compra realizada con éxito! 🎉</h2>
            <p>Tu número de pedido es: <strong>{orderId}</strong></p>
            <Link to="/">Volver a la tienda</Link>
        </div>
    );
};

export default OrderSuccess;
