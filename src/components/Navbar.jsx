const Navbar = ({ cartItemCount }) => {
    return (
        <nav className="navbar">
            <a href="#" className="navbar__logo">
                E-Cart
            </a>

            <div className="navbar__links">
                <a href="#home" className="navbar__link">
                    Home
                </a>

                <a href="#products" className="navbar__link">
                    All Products
                </a>

                <a href="#cart" className="navbar__link">
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