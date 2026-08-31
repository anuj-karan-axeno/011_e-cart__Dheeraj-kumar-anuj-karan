import Button from "./Button";
import Badge from "./Badge";

const ProductCard = ({
    name,
    price,
    image,
    category,
    onAddToCart,
    isInCart,
    onViewDetails,
}) => {
    return (
        <article className="product-card"
            onClick={onViewDetails}>

            <div className="product-card__image-wrapper">
                <img
                    className="product-card__image"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="product-card__content">

                <Badge
                    text={category}
                    color="default"
                />

                <h3 className="product-card__name">
                    {name}
                </h3>

                <p className="product-card__price">
                    ₹{price}
                </p>

                <div className="product-card__footer">

                    <Button
                        label="Add to Cart"
                        onClick={(event) => {
                            event.stopPropagation();
                            onAddToCart();
                        }}
                        variant="primary"
                    />

                    {isInCart && (
                        <Badge
                            text="In Cart"
                            color="success"
                        />
                    )}

                </div>

            </div>

        </article>
    );
};

export default ProductCard;