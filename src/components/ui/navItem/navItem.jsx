const NavItem = ({children, color = "#000", leftIcon, rightIcon, ...others}) => {
    return (
        <div {...others} className="cursor-pointer flex items-center justify-start gap-2">
            
            <div className="mt-1">
                {leftIcon}
            </div>

            <p style={{color: color}} className={`font-[700]`}>{children}</p>

            <div className="mt-1">
                {rightIcon}
            </div>
            
        </div>
    )
}

export default NavItem