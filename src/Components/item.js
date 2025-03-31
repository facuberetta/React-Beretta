import { Link } from "react-router-dom";

const Item = ({ id, name, price, image, stock }) => {
    return (
        <div className="card">
            <img className="card-img-top" src={image} alt={name} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">💰 Precio: <strong>${price}</strong></p>
                <p className="card-text">📦 Stock disponible: {stock}</p>
                <Link to={`/producto/${id}`} className="btn btn-primary">Ver detalle</Link>
                    Ver detalle
            </div>
        </div>
    );
};

export default Item;
