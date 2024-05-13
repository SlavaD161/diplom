import { Link } from "react-router-dom"

const Topbar = ({title, linkName}) => {
    return (
        <div className="bg-[#E5F4ED] rounded-xl flex flex-col items-center w-full py-[45px] gap-[15px]">
            <h1 className="text-[40px] font-[700] text-black">{title}</h1>
            <p className="text-[15px] text-black font[500] flex items-center justify-center gap-[10px]">
                <Link to={"/"} style={{color: "#7E7E7E"}}>Главная</Link> 
                <span>{">"}</span>
                {linkName}
            </p>
        </div>
    )
}

export default Topbar