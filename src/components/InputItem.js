const variants = {
  primary:
    "bg-white/50 placeholder:text-gray/30 focus:bg-white/90 focus:placeholder:text-gray/70 not-placeholder-shown:bg-white/90 caret-orange",
};

const InputItem = ({
  className = "",
  type = "text",
  variant = "primary",
  children,
  placeholder,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-[10px] px-[33px] py-[24px] transition-colors focus:outline-none";

  return (
    <input
      className={`${base} ${variants[variant]} ${className}`}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default InputItem;
