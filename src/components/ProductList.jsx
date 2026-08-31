import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

const ProductList = ({
    products,
    onAddToCart,
    cartItems,
    onViewDetails,
}) => {
    if (products.length === 0) {
        return (
            <EmptyState message="No products found" />
        );
    }

    return (
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
    );
};

export default ProductList;