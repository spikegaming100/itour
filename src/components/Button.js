const variants = {
  primary: "bg-orange text-white hover:bg-orange-light",
  secondary: "bg-white text-gray hover:bg-gray-300",
};

const Button = ({
  className = "",
  variant = "primary",
  onClick,
  children,
  ...props
}) => {
  const base =
    "inline-flex w-fit cursor-pointer items-center justify-center rounded-lg px-21 py-6 transition-colors focus:outline-none";

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
