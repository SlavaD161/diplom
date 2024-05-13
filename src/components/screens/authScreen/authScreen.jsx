import { Link, useNavigate } from "react-router-dom"
import Logo from "../../shared/logo/logo"
import UserPlace from "../../ui/userPlace/userPlace"
import Button from "../../ui/button/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_COUNTRIES } from "../../../utils/config"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 
import { app, db } from "../../../firebase/firebase"

const AuthScreen = () => {

    const navigate = useNavigate();

    const [countries, setCounties] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("Выберите страну")
    const [selectedContinent, setSelectedContinent] = useState("Выберите континент")

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [isError, setError] = useState()
    const [errorTxt, setErrorTxt] = useState()

    const [users] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    useEffect(() => {

        if (localStorage.getItem("isLogined")) {
            navigate("/")
        }

        axios.get(API_COUNTRIES).then(res => {
            setCounties(res.data)
        })
    }, [])

    const addUser = async () => {
        if (!email || !email.toString().includes("@")) {

            setError(true)
            setErrorTxt("Введите Email правльно! info@mail.ru")
            setTimeout(() => {
                setError(false)
            }, 2500)

        } else {
            
            if (!users?.docs.filter(i => i.data().email == email).length) {
                if (email && password) {

                    const usersRef = doc(db, 'users', email);

                    localStorage.setItem("isLogined", true)
                    localStorage.setItem("user", email)
        
                    await setDoc(usersRef, {
                        email: email,
                        country: selectedCountry,
                        password: password,
                        continent: selectedContinent
                    }, { merge: true }).then(() => {
                        console.log(1);
                    })

                    navigate("/")

                } else {

                    setError(true)
                    setErrorTxt("Введите все поля!")
                    setTimeout(() => {
                        setError(false)
                    }, 2500)

                }
            } else {
                const passwordRes = users?.docs.filter(i => i.data().email == email)[0].data().password

                if (passwordRes == password) {
                    
                    localStorage.setItem("isLogined", true)
                    localStorage.setItem("user", email)

                    navigate("/")

                } else {
                    setError(true)
                    setErrorTxt("Пароль неверная!")
                    setTimeout(() => {
                        setError(false)
                    }, 2500)
                }

            }

        }
    }

    return (
        <div className="auth h-screen flex justify-center pt-20 md:pt-0 md:items-center">

            {
                isError &&
                <div role="alert" className="absolute z-50 top-3 w-10/12 alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorTxt}</span>
                </div>
            }

            <div className="bg-[#1212121e] backdrop-blur-sm px-[35px] md:w-fit w-full md:mx-0 mx-5 py-[60px] rounded-2xl shadow-2xl">
                
                <Link to={"/"}>
                    <div className="flex items-center -ml-6 justify-center gap-[5px]">
                        <Logo withTitle={false} />
                        <h1 className="font-bold text-[18px] text-white ml-[8px]">Animal Exp</h1>
                    </div>
                </Link>

                <div className="mt-[30px] flex flex-col items-center w-full gap-2">

                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Email:</p>
                        <UserPlace
                            type="email"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>}
                            placeholder={"Email..."}
                            setValue={setEmail}
                        />  
                    </div>

                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Пароль:</p>
                        <UserPlace
                            type="password"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>}
                            placeholder={"Пароль..."}
                            setValue={setPassword}
                        />
                    </div>
                    
                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Выберите континент:</p>
                        <div className="dropdown relative z-50 w-full">
                            <div tabIndex={0} role="button" className="btn rounded-[12px] w-full text-start font-medium bg-[#FFFFFF] text-[16px] text-[#65676b] flex justify-start px-7">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 30 36" fill="none">
                                    <path d="M28.9688 15.8438L2.90625 0.28125C2.75 0.1875 2.58594 0.117188 2.41406 0.0703125C2.24219 0.0234375 2.0625 0 1.875 0C1.34375 0 0.898438 0.179688 0.539062 0.539062C0.179688 0.898438 0 1.34375 0 1.875V34.125C0 34.625 0.179688 35.0625 0.539062 35.4375C0.898438 35.8125 1.34375 36 1.875 36C2.0625 36 2.24219 35.9688 2.41406 35.9062C2.58594 35.8438 2.75 35.7656 2.90625 35.6719L28.9688 20.1562C29.2812 19.9062 29.5312 19.5938 29.7188 19.2188C29.9062 18.8438 30 18.4375 30 18C30 17.5625 29.9062 17.1562 29.7188 16.7812C29.5312 16.4062 29.2812 16.0938 28.9688 15.8438Z" fill="#7E7E7E"/>
                                </svg>
                                {selectedContinent}</div>
                            <ul tabIndex={0} className="dropdown-content overflow-x-hidden max-h-72 w-72 overflow-auto bg-white rounded-xl py-2 px-1 flex flex-col items-start mt-2">

                                {[
                                    "Евразия", "Африка", "Северная Америка", "Южная Америка", "Австралия", "Антарктида"
                                ].map((item, index) => (
                                    <li key={item} onClick={() => {
                                            setSelectedContinent(item)
                                            const elem = document.activeElement;
                                            if (elem) {
                                                elem?.blur();
                                            }
                                        }} className="font-[500] flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-50 text-[#535353] px-[10px] rounded-lg py-[5px] w-full">
                                        <p className="text-[12px] text-[#969696]">#{index + 1}</p>
                                        {item}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Выберите страну:</p>
                        <div className="dropdown relative z-10 w-full">
                            <div tabIndex={0} role="button" className="btn rounded-[12px] w-full text-start font-medium bg-[#FFFFFF] text-[16px] text-[#65676b] flex justify-start px-7">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 30 36" fill="none">
                                    <path d="M28.9688 15.8438L2.90625 0.28125C2.75 0.1875 2.58594 0.117188 2.41406 0.0703125C2.24219 0.0234375 2.0625 0 1.875 0C1.34375 0 0.898438 0.179688 0.539062 0.539062C0.179688 0.898438 0 1.34375 0 1.875V34.125C0 34.625 0.179688 35.0625 0.539062 35.4375C0.898438 35.8125 1.34375 36 1.875 36C2.0625 36 2.24219 35.9688 2.41406 35.9062C2.58594 35.8438 2.75 35.7656 2.90625 35.6719L28.9688 20.1562C29.2812 19.9062 29.5312 19.5938 29.7188 19.2188C29.9062 18.8438 30 18.4375 30 18C30 17.5625 29.9062 17.1562 29.7188 16.7812C29.5312 16.4062 29.2812 16.0938 28.9688 15.8438Z" fill="#7E7E7E"/>
                                </svg>
                                {selectedCountry}</div>
                            <ul tabIndex={0} className="dropdown-content overflow-x-hidden max-h-72 w-72 overflow-auto bg-white rounded-xl py-2 px-1 flex flex-col items-start mt-2">

                                <input onKeyDown={e => {
                                    if (e.keyCode == 8) {
                                        axios.get(API_COUNTRIES).then(res => {
                                            setCounties(res.data)
                                        })
                                    }
                                    setCounties(countries.filter(i => {
                                        return i.name.common.toLowerCase().includes(e.target.value.toLowerCase())
                                    }))
                                }} type="text" className="w-full my-2 ml-1 px-2 sticky top-0 py-2 border outline-none rounded-lg text-[#535353]" placeholder="Поиск..." />

                                {countries.map((item, index) => (
                                    <li key={item.id} onClick={() => {
                                            setSelectedCountry(item.name.common)
                                            const elem = document.activeElement;
                                            if (elem) {
                                                elem?.blur();
                                            }
                                        }} className="font-[500] flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-50 text-[#535353] px-[10px] rounded-lg py-[5px] w-full">
                                        <p className="text-[12px] text-[#969696]">#{index + 1}</p>
                                        <img className="w-5" src={item.flags.png} alt={item.flags.alt} />
                                        {item.name.common}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-end mt-[10px] w-full">
                        <div className="w-fit" onClick={addUser}>
                            <Button>
                                <p>Войти</p>
                            </Button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AuthScreen