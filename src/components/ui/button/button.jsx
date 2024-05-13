const Button = ({children, leftIcon, rightIcon, bg = "#2EBB77", classNames}) => {
    return (
        <button style={{background: bg}} className={`${classNames} btn px-[35px] text-[17px] border-0 flex items-center hover:-translate-x-0.5 gap-1.5 text-[#fff]`}>
            
            <div className="mt-1">
                {leftIcon}
            </div>

            {children}

            <div className="mt-1">
                {rightIcon}
            </div>

        </button>
    )
}

export default Button