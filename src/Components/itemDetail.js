import ItemCount from "./itemCount";

const ItemDetail = ({ item, onAddToCart }) => {
    if (!item || Object.keys(item).length === 0) {
        return <p>Producto no encontrado</p>;
    }

    const { id, name, image, description, price, stock } = item;

    const handleAdd = (quantity) => {
        if (!onAddToCart) {
            console.error("Error: `onAddToCart` no está definido.");
            return;
        }

        if (quantity > stock) {
            console.warn("No puedes agregar más productos de los que hay en stock.");
            return;
        }

        console.log("Producto agregado al carrito:", { ...item, quantity });
        onAddToCart({ ...item, quantity });
    };

    return (
        <div className="item-detail">
            {image ? <img src={image} alt={name} /> : <p>Imagen no disponible</p>}
            <h2>{name || "Nombre no disponible"}</h2>
            <p>{description || "Sin descripción"}</p>
            <h3>${price || "Precio no disponible"}</h3>
            {stock > 0 ? (
                <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
            ) : (
                <p style={{ color: "red" }}>Sin stock</p>
            )}
        </div>
    );
};

export default ItemDetail;



