import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import { products } from "./data/products";

import "./styles/main.scss";


const MAX_QTY = 10;
const DISCOUNT_CODE = "SAVE10";
const DISCOUNT_RATE = 0.10;


function App() {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("low");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [couponCode, setCouponCode] = useState("");

  const [discountApplied, setDiscountApplied] = useState(false);

  const [couponMessage, setCouponMessage] = useState("");


  function updateCart(newCart) {
    setCartItems(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  }


  function handleAddToCart(product) {

    const existingItem = cartItems.find((item) => item.id === product.id);

    let newCart;

    if (existingItem) {

      if (existingItem.quantity >= MAX_QTY) {
        return;
      }

      newCart = cartItems.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      );

    } else {

      newCart = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    }
    alert("Product added into cart :)")

    updateCart(newCart);
  }


  function handleIncrease(id) {

    const newCart = cartItems.map((item) => {

      if (item.id !== id) {
        return item;
      }

      if (item.quantity >= MAX_QTY) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    updateCart(newCart);
  }


  function handleDecrease(id) {

    const newCart = cartItems.map((item) => {

      if (item.id !== id) {
        return item;
      }

      if (item.quantity === 1) {
        return null;
      }

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    })
      .filter(Boolean);

    updateCart(newCart);
  }


  function handleRemove(id) {

    const newCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(newCart);
  }


  function clearCart() {

    updateCart([]);

    setCouponCode("");
    setDiscountApplied(false);
    setCouponMessage("");
  }


  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }


  function handleSortChange(event) {
    setSortOrder(event.target.value);
  }


  function handleViewDetails(product) {
    setSelectedProduct(product);

    window.scrollTo({
      top: document.getElementById("product-details")?.offsetTop || 0,
      behavior: "smooth",
    });
  }

  function handleCouponChange(event) {

    const uppercaseValue = event.target.value.toUpperCase();

    setCouponCode(uppercaseValue);

    setCouponMessage("");

    if (discountApplied) {
      setDiscountApplied(false);
    }
  }


  function handleApplyCoupon(event) {

    event.preventDefault();

    const normalizedCode = couponCode
      .trim()
      .toUpperCase();


    if (normalizedCode === DISCOUNT_CODE) {

      setDiscountApplied(true);

      setCouponCode(DISCOUNT_CODE);

      setCouponMessage(
        "10% discount applied successfully."
      );

      return;
    }


    setDiscountApplied(false);

    setCouponMessage(
      "Invalid coupon code."
    );
  }


  function handleRemoveCoupon() {

    setCouponCode("");

    setDiscountApplied(false);

    setCouponMessage("");
  }


  function handleCheckout() {
    const confirmed = confirm("Proceed to checkout?");

    if (!confirmed) {
      return;
    }

    alert("Checkout successful! Your cart is now empty.");
    clearCart();
  }


  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  const sortedProducts = [...filteredProducts].sort(
    (firstProduct, secondProduct) => {

      if (sortOrder === "high") {
        return secondProduct.price - firstProduct.price;
      }

      return firstProduct.price - secondProduct.price;
    }
  );


  const cartItemCount = cartItems.reduce((total, item) => {

    return total + item.quantity
  }, 0
  );


  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const discountAmount = discountApplied
    ? cartTotal * DISCOUNT_RATE
    : 0;


  const finalTotal = cartTotal - discountAmount;


  return (
    <>
      <Navbar
        cartItemCount={cartItemCount}
      />

      <main>

        <Home />

        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
        />

        <ProductList
          products={sortedProducts}
          onAddToCart={handleAddToCart}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onViewDetails={handleViewDetails}
          cartItems={cartItems}
        />

        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
          totalPrice={cartTotal}
          totalItemCount={cartItemCount}
          couponCode={couponCode}
          onCouponChange={handleCouponChange}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          couponMessage={couponMessage}
          discountApplied={discountApplied}
          discountAmount={discountAmount}
          finalTotal={finalTotal}
        />

      </main>
    </>
  );
}


export default App;