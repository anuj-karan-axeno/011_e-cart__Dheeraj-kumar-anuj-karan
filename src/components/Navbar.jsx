const Navbar = ({ cartItemCount }) => {
    return (
        <nav className="navbar">
            <a href="#" className="navbar__logo">
                E-Cart
            </a>

            <div className="navbar__links">
                <a href="#product-description" className="navbar__link">
                    Product Description
                </a>

                <a href="#product-description" className="navbar__link">
                    All Products
                </a>

                <a href="#product-description" className="navbar__link">
                    Cart
                    <span className="navbar__cart-count">
                        {cartItemCount}
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;