import { useState, useEffect } from "react"; // <-- Agregamos la importación
import { collection, getDocs } from "firebase/firestore";
import ItemList from "./itemList";
import { db } from "../firebaseConfig";

const ItemListContainer = ({ filter }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsCollection = collection(db, "vinos");

    getDocs(itemsCollection)
      .then((snapshot) => {
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Productos obtenidos:", itemsData);
        setItems(itemsData);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredItems = filter
    ? items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : items;

  return (
    <div>
      {loading ? <h2>Cargando productos...</h2> : <ItemList items={filteredItems} />}
    </div>
  );
};


export default ItemListContainer;
