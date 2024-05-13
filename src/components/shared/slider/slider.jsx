import { Link } from "react-router-dom"
import Button from "../../ui/button/button"

const Slider = ({title, desc, link, imgUrl}) => {
    return (
        <div className="bg-[#E5F4ED] flex justify-between flex-col md:flex-row items-start py-[50px] rounded-xl px-[20px] md:px-[100px] gap-[60px]">

            <div className="flex flex-col relative z-10 mt-[50px] items-start">

                <h1 data-swiper-parallax="-800" className="text-[32px] md:text-[48px] font-[700] max-w-[555px] leading-[55px] text-black">{title}</h1>

                <p data-swiper-parallax="-500" className="mt-2 md:mt-[16px] text-[#7E7E7E] text-[20px] font-medium max-w-[500px]">{desc}</p>
                
                <div className="mt-[40px]" data-swiper-parallax="-200">
                    <Button>
                        <Link to={link}>Посмотреть</Link>
                    </Button>
                </div>

            </div>

            <img src={imgUrl} alt={title} className="absolute md:static object-cover h-96 opacity-35 md:opacity-100 right-2 top-20 w-6/12 rounded-[40px] mix-blend-luminosity" />
            
        </div>
    )
}

export default Slider