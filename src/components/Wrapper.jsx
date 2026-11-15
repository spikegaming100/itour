const Wrapper = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`max-w-360 flex flex-1 my-0 max-[768px]:mx-4 mx-18.75 min-[1588px]:mx-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Wrapper;
