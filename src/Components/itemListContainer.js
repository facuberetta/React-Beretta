import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ItemList from "./itemList";

const ItemListContainer = ({ filter }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "vinos");

    getDocs(itemsCollection)
      .then((snapshot) => {
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Aquí filtramos los productos si hay un filtro
  const filteredItems = filter
    ? items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    : items;

  return (
    <div>
      {loading ? <h2>Cargando productos...</h2> : <ItemList items={filteredItems} />}
    </div>
  );
};

export default ItemListContainer;
