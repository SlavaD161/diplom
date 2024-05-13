import { useEffect, useState } from "react"
import {logo} from "../../assets/images"
import { Link } from "react-router-dom"
import { db, app } from '../../firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore"; 

const Adminpanel = () => {

    const [tab, setTab] = useState(1)

    const [animals] = useCollection(
        collection(getFirestore(app), 'animals'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const [categories] = useCollection(
        collection(getFirestore(app), 'categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const [users] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const deleteAnimal = async (id) => {
        await deleteDoc(doc(db, "animals", id))
    }

    const [animalInp, setAnimalsInp] = useState({})

    const addAnimal = async () => {
        if (animalInp.name && animalInp.desc && animalInp.imgUrl && animalInp.location && animalInp.mass && animalInp.size && animalInp.speed) {

            const animalsRef = doc(db, 'animals', animalInp.name);
            setAnimalsInp({
                name: "",
                desc: "",
                imgUrl: "",
                location: "",
                mass: "",
                size: "",
                speed: "",
                category: "",
            })

            await setDoc(animalsRef, {
                category: animalInp.category || categories?.docs[0].data().name,
                desc: animalInp.desc,
                imgUrl: animalInp.imgUrl,
                location: animalInp.location,
                mass: animalInp.mass,
                name: animalInp.name,
                ratedBy: "",
                ratings: "",
                size: animalInp.size,
                speed: animalInp.speed,
                biom: animalInp.biom,
            }, { merge: true });

            document.getElementById('animalModal').close()
        }
    }


    const deleteCategory = async (id) => {
        await deleteDoc(doc(db, "categories", id))
    }

    const [categoryInp, setCategoryInp] = useState({})

    const addCategory = async () => {
        if (categoryInp.name && categoryInp.desc && categoryInp.imgUrl) {

            const categoryRef = doc(db, 'categories', categoryInp.name);
            setCategoryInp({
                name: "",
                desc: "",
                imgUrl: "",
            })

            await setDoc(categoryRef, {
                name: categoryInp.name,
                desc: categoryInp.desc,
                imgUrl: categoryInp.imgUrl,
            }, { merge: true });

            document.getElementById('categoryModal').close()
        }
    }

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id))
    }

    return (
        <>
            <div className="flex justify-start flex-col md:flex-row items-start">
                <div className="w-full md:w-[360px] bg-[#FFFFFF] md:h-screen flex flex-col items-center md:pb-0 pb-[20px] pt-5 shadow-admin">
                    <Link to={"/"}>
                        <img src={logo} alt="logo" className="w-10" />
                    </Link>
                    <div className="mt-[35px] flex flex-col items-start gap-3 w-full px-6">
                        <p onClick={() => setTab(1)} className={`${tab == 1 ? "bg-[#458FF6] text-[#fff] font-medium " : "bg-[#ececec50] text-[#7a7c80] "} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}>Категории</p>
                        <p onClick={() => setTab(2)} className={`${tab == 2 ? "bg-[#458FF6] text-[#fff] font-medium " : "bg-[#ececec50] text-[#7a7c80] "} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}>Животные</p>
                        <p onClick={() => setTab(3)} className={`${tab == 3 ? "bg-[#458FF6] text-[#fff] font-medium " : "bg-[#ececec50] text-[#7a7c80] "} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}>Пользователи</p>
                    </div>
                </div>
                <div className="p-5 bg-[#FAFBFF] w-11/12">
                    {
                        tab == 1 
                        &&
                        <div className="overflow-x-auto h-screen">
                            <div className="flex justify-between items-center my-3">
                                <h1 className="text-2xl font-[800] text-[#5c5c5c]">Категории</h1>
                                <button onClick={() => document.getElementById('categoryModal').showModal()} className="btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]">Добавить категорию</button>
                            </div>
                            <table className="shadow-admin2 table my-20 bg-[#FFFFFF] w-11/12 mx-auto">
                                <thead className="2xl:table hidden w-full">
                                    <tr className="flex justify-between py-2.5">
                                        <th className="w-[65px] text-center">№</th>
                                        <th className="w-1/12">Имя</th>
                                        <th className="w-6/12">Описание</th>
                                        <th className="w-3/12">Картинка</th>
                                        <th className="w-1/12 text-center">Удалить</th>
                                    </tr>
                                </thead>
                                <tbody className="rounded-[30px] w-full">
                                    {
                                        categories?.docs.sort().map((item, index) => (
                                            <tr className="bg-[#FFFFFF] hover:bg-[#f1f1f16c] flex-col items-start xl:flex-row flex justify-between w-full py-[10px]">
                                                <th className="w-[65px] hidden xl:block text-center">{index + 1}</th>
                                                <td className="w-1/12">{item.data().name}</td>
                                                <td className="w-6/12">{item.data().desc}</td>
                                                <td className="w-3/12">{item.data().imgUrl.toString().slice(0, 36)}...</td>
                                                <td onClick={() => deleteCategory(item.id)} className="w-1/12 cursor-pointer block hover:scale-105 transition-all text-red-500 text-center">x</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        tab == 2 
                        &&
                        <div className="overflow-x-auto h-screen">
                            <div className="flex justify-between items-center my-3">
                                <h1 className="text-2xl font-[800] text-[#5c5c5c]">Животные</h1>
                                <button onClick={() => document.getElementById('animalModal').showModal()} className="btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]">Добавить животное</button>
                            </div>
                            <table className="shadow-admin2 table my-20 bg-[#FFFFFF] w-11/12 mx-auto">
                                <thead className="w-full hidden 2xl:table">
                                    <tr className="flex justify-between py-2.5">
                                        <th className="w-[65px] text-center">№</th>
                                        <th className="w-2/12">Имя</th>
                                        <th className="w-2/12">Категория</th>
                                        <th className="w-5/12">Картинка</th>
                                        <th className="w-3/12">Место проживания</th>
                                        <th className="w-2/12">Масса</th>
                                        <th className="w-2/12">Размер</th>
                                        <th className="w-2/12">Скорость</th>
                                        <th className="w-1/12">Удалить</th>
                                    </tr>
                                </thead>
                                <tbody className="rounded-[30px] w-full">
                                    {
                                        animals?.docs.sort().map((item, index) => (
                                            <tr className="bg-[#FFFFFF] hover:bg-[#f1f1f16c] flex-col items-start 2xl:flex-row flex justify-between w-full py-[10px]">
                                                <th className="w-[65px] hidden xl:block text-center">{index + 1}</th>
                                                <td className="w-2/12">{item.data().name}</td>
                                                <td className="w-2/12">{item.data().category}</td>
                                                <td className="w-5/12">{item.data().imgUrl.toString().slice(0, 36)}...</td>
                                                <td className="w-3/12">{item.data().location}</td>
                                                <td className="w-2/12">{item.data().mass}</td>
                                                <td className="w-2/12">{item.data().size}</td>
                                                <td className="w-2/12">{item.data().speed}</td>
                                                <td onClick={() => deleteAnimal(item.id)} className="w-1/12 cursor-pointer block hover:scale-105 transition-all text-red-500 text-center">x</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        tab == 3 
                        &&
                        <div className="overflow-x-auto h-screen">
                            <div className="flex justify-between items-center my-3">
                                <h1 className="text-2xl font-[800] text-[#5c5c5c]">Пользователи</h1>
                            </div>
                            <table className="shadow-admin2 table my-20 bg-[#FFFFFF] w-11/12 mx-auto">
                                <thead className="w-full hidden 2xl:table">
                                    <tr className="flex justify-between py-2.5">
                                        <th className="w-[65px] text-center">№</th>
                                        <th className="w-4/12">Email</th>
                                        <th className="w-3/12">Пароль</th>
                                        <th className="w-5/12">Континент</th>
                                        <th className="w-3/12">Страна</th>
                                        <th className="w-1/12">Удалить</th>
                                    </tr>
                                </thead>
                                <tbody className="rounded-[30px] w-full">
                                    {
                                        users?.docs.sort().map((item, index) => (
                                            <tr className="bg-[#FFFFFF] hover:bg-[#f1f1f16c] flex-col items-start 2xl:flex-row flex justify-between w-full py-[10px]">
                                                <th className="w-[65px] hidden xl:block text-center">{index + 1}</th>
                                                <td className="w-4/12">{item.data().email}</td>
                                                <td className="w-3/12">{item.data().password}</td>
                                                <td className="w-5/12">{item.data().continent}</td>
                                                <td className="w-3/12">{item.data().country}</td>
                                                <td onClick={() => deleteUser(item.id)} className="w-1/12 cursor-pointer block hover:scale-105 transition-all text-red-500 text-center">x</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
            :
            <div></div>

            <dialog id="categoryModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Добавить категорию.</h3>
                    <div className="w-full flex flex-col gap-2 mt-[15px]">
                        <input onChange={e => setCategoryInp(prev => ({ ...prev, name: e.target.value }))} value={categoryInp.name} type="text" placeholder="Имя" className="input input-bordered" />
                        <input onChange={e => setCategoryInp(prev => ({...prev, desc: e.target.value}))} value={categoryInp.desc} type="text" placeholder="Описание" className="input input-bordered" />
                        <input onChange={e => setCategoryInp(prev => ({...prev, imgUrl: e.target.value}))} value={categoryInp.imgUrl} type="text" placeholder="Картинка URL" className="input input-bordered" />

                        <button onClick={addCategory} className="mt-[10px] btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]">Добавить</button>

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="animalModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Добавить животное.</h3>
                    <div className="w-full flex flex-col gap-2 mt-[15px]">
                        <input onChange={e => setAnimalsInp(prev => ({ ...prev, name: e.target.value }))} value={animalInp.name} type="text" placeholder="Имя" className="input input-bordered" />
                        <input onChange={e => setAnimalsInp(prev => ({...prev, desc: e.target.value}))} value={animalInp.desc} type="text" placeholder="Описание" className="input input-bordered" />
                        <input onChange={e => setAnimalsInp(prev => ({...prev, imgUrl: e.target.value}))} value={animalInp.imgUrl} type="text" placeholder="Картинка URL" className="input input-bordered" />
                        <input onChange={e => setAnimalsInp(prev => ({...prev, mass: e.target.value}))} value={animalInp.mass} type="text" placeholder="Масса" className="input input-bordered" />
                        <input onChange={e => setAnimalsInp(prev => ({...prev, size: e.target.value}))} value={animalInp.size} type="text" placeholder="Размер" className="input input-bordered" />
                        <input onChange={e => setAnimalsInp(prev => ({...prev, speed: e.target.value}))} value={animalInp.speed} type="text" placeholder="Скорость" className="input input-bordered" />

                        <select defaultValue={categories?.docs[0]?.data().name} onChange={e => setAnimalsInp(prev => ({...prev, category: e.target.value}))} value={animalInp.category} className="select select-bordered">
                            {
                                categories?.docs.map(i => (
                                    <option value={i.data().name}>{i.data().name}</option>
                                ))
                            }
                        </select>

                        <input onChange={e => setAnimalsInp(prev => ({...prev, location: e.target.value}))} value={animalInp.location} type="text" placeholder={`Континенты (через - ",")`} className="input input-bordered" />

                        <input onChange={e => setAnimalsInp(prev => ({...prev, biom: e.target.value}))} value={animalInp.biom} type="text" placeholder="Биом" className="input input-bordered" />

                        <button onClick={addAnimal} className="mt-[10px] btn bg-[#458FF6] hover:bg-[#3166AF] text-[#fff]">Добавить</button>

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>     

        </>
    )
}

export default Adminpanel