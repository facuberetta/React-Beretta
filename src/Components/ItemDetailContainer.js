import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemDetail from "../ItemDetail"; 

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    const db = getFirestore(); 
    const itemRef = doc(db, "vinos", id);

    
    getDoc(itemRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No hay documento con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]); 

  return (
    <div>
      {loading ? (
        <h2>Cargando...</h2> 
      ) : (
        <ItemDetail item={item} /> 
      )}
    </div>
  );
};

export default ItemDetailContainer;
