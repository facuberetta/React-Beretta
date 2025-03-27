import Item from "./item";

const ItemList = ({ items }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="col-md-4" key={item.id}>
              <Item {...item} />
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;
