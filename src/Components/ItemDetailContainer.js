import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemDetail from "./itemDetail"; 
import { useCart } from "../context/CartContext";

const ItemDetailContainer = () => {
  const { addToCart } = useCart(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("ID de producto no válido.");
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const db = getFirestore();
        const itemRef = doc(db, "vinos", id);
        const docSnap = await getDoc(itemRef);
    
        if (docSnap.exists()) {
          const itemData = docSnap.data();
          console.log("Datos del producto:", itemData); // Verifica los datos obtenidos
    
          // Verifica si hay campos faltantes
          if (!itemData.name || !itemData.price || !itemData.stock) {
            throw new Error("Datos incompletos en Firebase.");
          }
    
          setItem({ id: docSnap.id, ...itemData });
        } else {
          setError("Producto no encontrado.");
        }
      } catch (err) {
        console.error("Error al obtener el documento:", err);
        setError("Ocurrió un error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return <ItemDetail item={item} onAddToCart={addToCart} />;
};

export default ItemDetailContainer;

