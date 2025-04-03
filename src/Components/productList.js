import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemListContainer from "./itemListContainer";

const ProductList = ({ products, addToCart }) => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (categoryName) {
      setFilteredProducts(products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase()));
    } else {
      setFilteredProducts(products);
    }
  }, [categoryName, products]);

  return (
    <div>
      <h2>{categoryName ? `Vinos de la categoría: ${categoryName}` : "Todos los vinos"}</h2>
      <ItemListContainer items={filteredProducts} addToCart={addToCart} />
    </div>
  );
};

export default ProductList;

