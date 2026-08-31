const Button = ({ label, onClick, variant = "primary", disabled = false }) => {
    return (
        <button
            type="button"
            className={`button button--${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;