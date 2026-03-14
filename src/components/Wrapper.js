const Wrapper = ({children, className = "", ...props}) => {
    return (
        <div className={`max-w-[1440px] flex flex-1 my-0 mx-[74px] min-[1588px]:mx-auto ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Wrapper;