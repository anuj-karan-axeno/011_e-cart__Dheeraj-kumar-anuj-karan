import CartItem from "./CartItem";
import EmptyState from "./EmptyState";
import Badge from "./Badge";
import Button from "./Button";

const MAX_QTY = 10;

const Cart = ({
    cartItems,
    onIncrease,
    onDecrease,
    onRemove,
    onClear,
}) => {
    if (cartItems.length === 0) {
        return (
            <section id="cart" className="cart">
                <div className="cart__header">
                    <h2 className="cart__title">
                        Your Cart
                    </h2>
                </div>

                <EmptyState message="Your cart is empty" />
            </section>
        );
    }

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <section id="cart" className="cart">
            <div className="cart__header">
                <h2 className="cart__title">
                    Your Cart
                </h2>
                {cartItems.length > 0 && (
                    <Button
                        label="Clear Cart"
                        onClick={onClear}
                        variant="outline"
                    />
                )}

                <Badge
                    text={`${totalItems} items`}
                    color="success"
                />
            </div>

            <div className="cart__items">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        quantity={item.quantity}
                        onIncrease={() =>
                            onIncrease(item.id)
                        }
                        onDecrease={() =>
                            onDecrease(item.id)
                        }
                        onRemove={() =>
                            onRemove(item.id)
                        }
                        disableIncrease={
                            item.quantity >= MAX_QTY
                        }
                    />
                ))}
            </div>

            <div className="cart__summary">
                <p className="cart__summary-text">
                    Total Items:{" "}
                    <strong>{totalItems}</strong>
                </p>

                <p className="cart__summary-text">
                    Total Price:{" "}
                    <strong>₹{totalPrice}</strong>
                </p>

                <Button
                    label="Clear Cart"
                    variant="danger"
                    onClick={onClear}
                />
            </div>
        </section>
    );
};

export default Cart;