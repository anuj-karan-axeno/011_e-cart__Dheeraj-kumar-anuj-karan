import { useState } from "react";

import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import ProductDetails from "./components/ProductDetails";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import { products } from "./data/products";

const MAX_QTY = 10;

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const updateCart = (newCart) => {
    setCartItems(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      if (existingItem.quantity >= MAX_QTY) {
        return;
      }

      const newCart = cartItems.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      );

      updateCart(newCart);


      return;
    }

    updateCart([
      ...cartItems,
      {
        ...product,
        quantity: 1,
      },
    ]);


    alert("Product added into cart successfully :)")
  };

  const handleIncrease = (id) => {
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
  };

  const handleDecrease = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      handleRemove(id);
      return;
    }

    const newCart = cartItems.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: item.quantity - 1,
        }
        : item
    );

    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(newCart);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];

  if (sortOrder === "low-to-high") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high-to-low") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleViewDetails = (product) => {
    setSelectedProduct(product);


    document
      .getElementById("product-details")
      ?.scrollIntoView({
        behavior: "smooth",

      });

  };


  return (
    <>
      <Navbar
        cartItemCount={cartItemCount}
      />

      <main>
        <ProductDescription />

        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        <section
          id="products"
          className="products-section"
        >
          <div className="products-section__header">
            <div>
              <p>Our Collection</p>

              <h2>All Products</h2>
            </div>

            <div className="products-section__controls">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <select
                className="products-section__sort"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Sort by Price
                </option>

                <option value="low-to-high">
                  Price: Low to High
                </option>

                <option value="high-to-low">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>

          <ProductList
            products={sortedProducts}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onViewDetails={handleViewDetails}
          />
        </section>

        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClear={() => updateCart([])}
        />
      </main>
    </>
  );
};

export default App;