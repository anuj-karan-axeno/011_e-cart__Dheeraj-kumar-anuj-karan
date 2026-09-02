import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";

const ProductList = ({
    products,
    onAddToCart,
    cartItems,
    onViewDetails,
    searchTerm,
    onSearchChange,
    sortOrder,
    onSortChange,
}) => {
    return (
        <section className="products-section" id="products">
            <div className="products-section__header">
                <div className="products-section__heading">
                    <p className="products-section__heading-label">
                        Shop collection
                    </p>
                    <h2 className="products-section__title">
                        All Products
                    </h2>
                </div>

                <div className="products-section__controls">
                    <SearchBar
                        value={searchTerm}
                        onChange={onSearchChange}
                    />

                    <select
                        className="products-section__sort"
                        value={sortOrder}
                        onChange={onSortChange}
                    >
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {products.length === 0 ? (
                <EmptyState message="No products found" />
            ) : (
                <div className="product-list">
                    {products.map((product) => {
                        const isInCart = cartItems.some(
                            (item) => item.id === product.id
                        );

                        return (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                onAddToCart={() =>
                                    onAddToCart(product)
                                }
                                isInCart={isInCart}
                                onViewDetails={() =>
                                    onViewDetails(product)
                                }
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default ProductList;