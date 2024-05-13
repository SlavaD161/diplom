import { Link } from "react-router-dom"
import Wrapper from "../../layout/wrapper"
import Logo from "../logo/logo"

const Footer = () => {
    return (
        <div className="mt-[120px] px-[20px] lg:px-[0px] bg-[#F8F8F8] py-[55px]">
            <Wrapper>
                <div className="flex justify-start gap-[80px] md:gap-[150px] items-start">
                    <Logo/>
                    <div className="flex flex-col gap-1.5 items-start">
                        <h2 className="mb-1 font-semibold text-black text-lg">Ссылки</h2>
                        <Link to={"/"}>Главная</Link>
                        <Link to={"/categories"}>Все категории</Link>
                        <Link to={"/animals"}>Все животные</Link>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Footer