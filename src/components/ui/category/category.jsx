import { Link } from "react-router-dom"

const Category = ({imgUrl, title, category, link, count}) => {
    return (
        <Link to={link}>

            <div className="flex flex-col items-center w-fit">

                <img className="bg-[#F5F5F5] hover:scale-105 transition-all duration-300 hover:shadow-2xl rounded-full w-[140px] h-[140px] md:w-[210px] md:h-[210px] object-cover" src={imgUrl} alt={title} />

                <div className="relative">
                    <h2 className="max-w-[250px] text-[20px] text-black font-bold mt-[10px]">{title}</h2>
                    <p className="absolute text-[15px] top-2 -right-5 font-semibold text-[#7E7E7E]">{count}</p>
                </div>

                <p className="text-[#7E7E7E] truncate text-center max-w-[100px] md:max-w-[180px] text-[17px]">{category}</p>

            </div>

        </Link>
    )
}

export default Category