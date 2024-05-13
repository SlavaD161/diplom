import { useEffect, useState } from "react"
import Button from "../../ui/button/button"
import Input from "../../ui/input/input"
import Logo from "../logo/logo"
import Avatar from "../avatar/avatar"
import { Link } from "react-router-dom"
import Navigation from "../navigation/navigation"

const Navbar = () => {

    const [search, setSearch] = useState()

    const searchAnimals = () => {
        if (search) {
            window.location.href = `/animals?search=${search}`
        }
    }

    const [menuCheck, setMenuCheck] = useState(false)

    return (
        <header className="py-[30px] px-[10px] lg:px-0 flex items-center justify-between">

            <div className="flex items-center justify-start gap-[90px]">

                <Link to={"/"}>
                    <Logo/>
                </Link>

                <div className="md:flex items-center hidden justify-start">
                    <Input 
                        onSearch={searchAnimals}
                        value={search}
                        setValue={setSearch}
                        placeholder={"Поиск..."}
                        leftIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 16 16" fill="currentColor" 
                                className="w-[16px] h-[16px] opacity-100"><path 
                                fillRule="evenodd" 
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" 
                                clipRule="evenodd" />
                            </svg>
                        } 
                    />
                    
                    <div className="w-fit" onClick={searchAnimals}>
                        <Button classNames={"-ml-5"} bg="#000">Поиск</Button>
                    </div>
                </div>

            </div>

            <div className="lg:hidden block">
                <div className="drawer z-50">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="drawer-button relative z-50">
                            <div onClick={() => setMenuCheck(prev => !prev)} className="btn-circle swap swap-rotate">
  
                                <input checked={menuCheck} type="checkbox" />
                                
                                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                                
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                            
                            </div>
                        </label>
                    </div> 
                    <div className="drawer-side w-full">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-9 w-full min-h-full bg-base-200 text-base-content">
                            <div className="flex justify-between items-center">
                                <Logo/>

                                {
                                    localStorage.getItem("isLogined") 

                                    ?

                                    <div className="dropdown mr-16 z-10">
                                        <div tabIndex={0}>
                                            <Avatar withName name={localStorage.getItem("user")}/>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content bg-white rounded-xl py-2 px-1 flex flex-col justify-end items-end gap-1 mt-2 right-0 -mr-2">
                                            <li onClick={() => {
                                                localStorage.removeItem("user")
                                                localStorage.removeItem("isLogined")
                                                window.location.reload()
                                            }} className="font-[500] hover:bg-gray-50 px-[15px] rounded-lg py-[10px] w-fit cursor-pointer">Выйти</li>
                                        </ul>
                                    </div>

                                    :
                                    
                                    <Link to={"/auth"}>
                                        <Button
                                            rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M0 5.625C0 5.47266 0.0556641 5.34082 0.166992 5.22949C0.27832 5.11816 0.410156 5.0625 0.5625 5.0625H12.9375C13.0898 5.0625 13.2217 5.11816 13.333 5.22949C13.4443 5.34082 13.5 5.47266 13.5 5.625C13.5 5.77734 13.4443 5.90918 13.333 6.02051C13.2217 6.13184 13.0898 6.1875 12.9375 6.1875H0.5625C0.410156 6.1875 0.27832 6.13184 0.166992 6.02051C0.0556641 5.90918 0 5.77734 0 5.625ZM7.4707 0.158203C7.58789 0.0527344 7.72266 0 7.875 0C8.02734 0 8.16211 0.0527344 8.2793 0.158203L13.3418 5.2207C13.4473 5.33789 13.5 5.47266 13.5 5.625C13.5 5.77734 13.4473 5.91211 13.3418 6.0293L8.2793 11.0918C8.16211 11.1973 8.02734 11.25 7.875 11.25C7.72266 11.25 7.58789 11.1973 7.4707 11.0918C7.36523 10.9746 7.3125 10.8398 7.3125 10.6875C7.3125 10.5352 7.36523 10.4004 7.4707 10.2832L12.1465 5.625L7.4707 0.966797C7.36523 0.849609 7.3125 0.714844 7.3125 0.5625C7.3125 0.410156 7.36523 0.275391 7.4707 0.158203Z" fill="white"/></svg>}
                                        >Регистрация</Button>
                                    </Link>
                                }

                            </div>
                            <div className="mt-[30px]">
                                <div className="flex items-center justify-start">
                                    <Input 
                                        onSearch={searchAnimals}
                                        value={search}
                                        setValue={setSearch}
                                        placeholder={"Поиск..."}
                                        leftIcon={
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 16 16" fill="currentColor" 
                                                className="w-[16px] h-[16px] opacity-100"><path 
                                                fillRule="evenodd" 
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" 
                                                clipRule="evenodd" />
                                            </svg>
                                        } 
                                    />
                                    
                                    <div className="w-fit" onClick={searchAnimals}>
                                        <Button classNames={"-ml-5"} bg="#000">Поиск</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[40px]">
                                <Navigation/>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

            {
                localStorage.getItem("isLogined") 

                ?

                <div className="dropdown lg:block hidden z-10">
                    <div tabIndex={0} className="cursor-pointer">
                        <Avatar withName name={localStorage.getItem("user")}/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content bg-white rounded-xl py-2 px-1 flex flex-col justify-end items-end gap-1 mt-2 right-0 -mr-2">
                        <li onClick={() => {
                            localStorage.removeItem("user")
                            localStorage.removeItem("isLogined")
                            window.location.reload()
                        }} className="font-[500] hover:bg-gray-50 px-[15px] rounded-lg text-end py-[10px] w-[170px] cursor-pointer">Выйти из аккаунта</li>
                    </ul>
                </div>

                :
                
                <Link to={"/auth"}>
                    <Button
                        rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M0 5.625C0 5.47266 0.0556641 5.34082 0.166992 5.22949C0.27832 5.11816 0.410156 5.0625 0.5625 5.0625H12.9375C13.0898 5.0625 13.2217 5.11816 13.333 5.22949C13.4443 5.34082 13.5 5.47266 13.5 5.625C13.5 5.77734 13.4443 5.90918 13.333 6.02051C13.2217 6.13184 13.0898 6.1875 12.9375 6.1875H0.5625C0.410156 6.1875 0.27832 6.13184 0.166992 6.02051C0.0556641 5.90918 0 5.77734 0 5.625ZM7.4707 0.158203C7.58789 0.0527344 7.72266 0 7.875 0C8.02734 0 8.16211 0.0527344 8.2793 0.158203L13.3418 5.2207C13.4473 5.33789 13.5 5.47266 13.5 5.625C13.5 5.77734 13.4473 5.91211 13.3418 6.0293L8.2793 11.0918C8.16211 11.1973 8.02734 11.25 7.875 11.25C7.72266 11.25 7.58789 11.1973 7.4707 11.0918C7.36523 10.9746 7.3125 10.8398 7.3125 10.6875C7.3125 10.5352 7.36523 10.4004 7.4707 10.2832L12.1465 5.625L7.4707 0.966797C7.36523 0.849609 7.3125 0.714844 7.3125 0.5625C7.3125 0.410156 7.36523 0.275391 7.4707 0.158203Z" fill="white"/></svg>}
                    >Регистрация</Button>
                </Link>
            }

        </header>
    )
}

export default Navbar