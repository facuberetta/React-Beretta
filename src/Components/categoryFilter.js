const CategoryFilter = ({ categories, setSelectedCategory }) => {
    return (
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Todos</option>
            <option value="Malbec">Malbec</option>
            <option value="Cabernet">Cabernet</option>
            <option value="Syrah">Syrah</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>
    );
};

export default CategoryFilter;
