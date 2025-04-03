import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import ItemList from "./itemList";
import { db } from "../firebaseConfig";

const ItemListContainer = ({ filter, selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "vinos"));
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Aplicamos filtros combinados (nombre y categoría)
  const filteredItems = items.filter((item) => {
    const matchesFilter = filter
      ? item.name.toLowerCase().includes(filter.toLowerCase())
      : true;
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesFilter && matchesCategory;
  });

  return (
    <div>
      {loading ? <h2>Cargando productos...</h2> : <ItemList items={filteredItems} />}
      {!loading && filteredItems.length === 0 && <h2>No hay productos disponibles.</h2>}
    </div>
  );
};

export default ItemListContainer;

