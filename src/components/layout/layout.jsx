import Navbar from "../shared/navbar/navbar"

const Layout = ({children}) => {
    return (
        <div className="flex min-h-screen px-[10px] lg:px-0 flex-col justify-between">
            <Navbar/>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default Layout