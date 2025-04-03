import { useNavigate } from "react-router-dom";

const CategoryFilter = ({ categories }) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const category = e.target.value;
        navigate(category ? `/category/${category.toLowerCase()}` : "/");
    };

    return (
        <select onChange={handleChange}>
            <option value="">Todos</option>
            {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
        </select>
    );
};

export default CategoryFilter;
