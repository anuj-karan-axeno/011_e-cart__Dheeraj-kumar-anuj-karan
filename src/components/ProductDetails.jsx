import Badge from "./Badge";
import Button from "./Button";

const ProductDetails = ({ product, onAddToCart, detailRef }) => {
    if (!product) {
        return null;
    }

    return (
        <section ref={detailRef} className="product-details" id="product-details">
           
            <div className="product-details__content">
                <div className="product-details__image">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-details__image-content"
                    />
                </div>

                <div className="product-details__info">
                    <Badge
                        text={product.category}
                        color="default"
                    />

                    <h2 className="product-details__title">{product.name}</h2>

                    <p className="product-details__price">
                        ₹{product.price}
                    </p>

                    <p className="product-details__description">
                        {product.description}
                    </p>

                    <Button
                        label="Add to Cart"
                        variant="primary"
                        onClick={() => onAddToCart(product)}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;