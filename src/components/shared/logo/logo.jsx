import { logo } from "../../../assets/images"

const Logo = ({withTitle = true}) => {
    return (
        <div className="flex items-center justify-start">

            <img src={logo} alt="logo" className="w-[38px]" />
            
            {withTitle && <h1 className="hidden md:block font-bold text-[18px] ml-[8px]">Animal Exp</h1>}

        </div>
    )
}

export default Logo