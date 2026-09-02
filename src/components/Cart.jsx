import CartItem from "./CartItem";
import EmptyState from "./EmptyState";
import Button from "./Button";


function Cart({
    cartItems,
    onIncrease,
    onDecrease,
    onRemove,
    onClearCart,
    onCheckout,
    totalPrice,
    totalItemCount,
    couponCode,
    onCouponChange,
    onApplyCoupon,
    onRemoveCoupon,
    couponMessage,
    discountApplied,
    discountAmount,
    finalTotal,
}) {

    return (
        <section
            id="cart"
            className="cart"
        >

            <div className="cart__header">

                <div className="cart__heading">

                    <p className="cart__eyebrow">
                        Your selection
                    </p>

                    <h2 className="cart__title">
                        Your Cart
                    </h2>

                </div>

                {cartItems.length > 0 && (
                    <Button
                        label="Clear Cart"
                        onClick={onClearCart}
                        variant="outline"
                    />
                )}

            </div>


            {cartItems.length === 0 ? (

                <EmptyState
                    message="Your cart is empty"
                />

            ) : (

                <>

                    <div className="cart__items">

                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                {...item}
                                onIncrease={() =>
                                    onIncrease(item.id)
                                }
                                onDecrease={() =>
                                    onDecrease(item.id)
                                }
                                onRemove={() =>
                                    onRemove(item.id)
                                }
                            />
                        ))}

                    </div>


                    <div className="cart__bottom">

                        <div className="cart__coupon">

                            <p className="cart__coupon-label">
                                Have a discount code?
                            </p>


                            <form
                                className="cart__coupon-form"
                                onSubmit={onApplyCoupon}
                            >

                                <input
                                    className="cart__coupon-input"
                                    type="text"
                                    value={couponCode}
                                    onChange={onCouponChange}
                                    placeholder="Enter coupon code"
                                    disabled={discountApplied}
                                />


                                {discountApplied ? (

                                    <Button
                                        label="Remove"
                                        onClick={onRemoveCoupon}
                                        variant="outline"
                                    />

                                ) : (

                                    <Button
                                        label="Apply"
                                        variant="primary"
                                        onClick={onApplyCoupon}
                                        disabled={!couponCode.trim()}
                                    />

                                )}

                            </form>


                            {couponMessage && (
                                <p
                                    className={
                                        discountApplied
                                            ? "cart__coupon-message cart__coupon-message--success"
                                            : "cart__coupon-message cart__coupon-message--error"
                                    }
                                >
                                    {couponMessage}
                                </p>
                            )}

                        </div>


                        <div className="cart__summary">

                            <div className="cart__summary-row">

                                <span className="cart__summary-label">
                                    Items
                                </span>

                                <span className="cart__summary-value">
                                    {totalItemCount}
                                </span>

                            </div>


                            <div className="cart__summary-row">

                                <span className="cart__summary-label">
                                    Subtotal
                                </span>

                                <span className="cart__summary-value">
                                    ₹{totalPrice?.toFixed(2)}
                                </span>

                            </div>


                            {discountApplied && (
                                <div className="cart__summary-row cart__summary-row--discount">

                                    <span className="cart__summary-label">
                                        Discount (10%)
                                    </span>

                                    <span className="cart__summary-value">
                                        -₹{discountAmount?.toFixed(2)}
                                    </span>

                                </div>
                            )}


                            <div className="cart__summary-total">

                                <span className="cart__summary-label">
                                    Total
                                </span>

                                <span className="cart__summary-value">
                                    ₹{finalTotal?.toFixed(2)}
                                </span>

                            </div>

                            <Button
                                label="Checkout"
                                onClick={onCheckout}
                                variant="primary"
                            />

                        </div>

                    </div>

                </>

            )}

        </section>
    );
}


export default Cart;