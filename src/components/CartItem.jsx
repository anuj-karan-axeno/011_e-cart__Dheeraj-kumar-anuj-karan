import Button from "./Button";

const CartItem = ({
    name,
    price,
    image,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
    disableIncrease,
}) => {
    const subtotal = price * quantity;

    return (
        <div className="cart-item">
            <div className="cart-item__product">
                <img
                    src={image}
                    alt={name}
                    className="cart-item__image"
                />

                <div className="cart-item__details">
                    <h3>{name}</h3>

                    <p>
                        ₹{price} × {quantity}
                    </p>

                    <strong>
                        ₹{subtotal}
                    </strong>
                </div>
            </div>

            <div className="cart-item__actions">
                <div className="cart-item__quantity">
                    <Button
                        label="−"
                        variant="outline"
                        onClick={onDecrease}
                    />

                    <span>{quantity}</span>

                    <Button
                        label="+"
                        variant="outline"
                        onClick={onIncrease}
                        disabled={disableIncrease}
                    />
                </div>

                <Button
                    label="Remove"
                    variant="danger"
                    onClick={onRemove}
                />
            </div>
        </div>
    );
};

export default CartItem;