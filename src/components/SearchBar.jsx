const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search products..."
            />
        </div>
    );
};

export default SearchBar;