import { useState } from "react";
import ItemListContainer from "./itemListContainer";

const ProductList = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Buscar vino..."
      />
      <ItemListContainer filter={filter} />
    </div>
  );
};

export default ProductList;
