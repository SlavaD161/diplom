import { Link } from "react-router-dom"
import NavItem from "../../ui/navItem/navItem"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from "firebase/firestore"; 
import { app } from "../../../firebase/firebase"

const Navigation = () => {

    const [categories] = useCollection(
        collection(getFirestore(app), 'categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    return (
        <section>

            <div className="flex items-start md:items-center flex-col md:flex-row justify-start gap-[25px]">

                <Link to={"/"}>
                    <NavItem
                        color={"#2EBB77"} 
                    >Главная</NavItem>
                </Link>

                <div className="dropdown relative z-10">
                    <NavItem
                        tabIndex={0}
                        rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="6" height="4" viewBox="0 0 6 4" fill="none">
                            <path d="M0.703125 0L3 2.28516L5.29688 0L6 0.703125L3 3.70312L0 0.703125L0.703125 0Z" fill="black"/>
                        </svg>}   
                    >Категории</NavItem>
                    <ul tabIndex={0} className="dropdown-content bg-white rounded-xl py-2 px-1 flex flex-col gap-1 items-start mt-2 -ml-[5px]">
                        {
                            categories?.docs.map(i => (
                                <Link key={i.id} to={`/animals?category=${i.data().name}`}><li className="font-[500] hover:bg-gray-50 px-[15px] rounded-lg py-[5px] w-40">{i.data().name}</li></Link>
                            ))
                        }
                    </ul>
                </div>

                <Link to={"/animals"}>
                    <NavItem>Все животные</NavItem>
                </Link>

                {
                    !localStorage.getItem("isLogined")
                    &&
                    <Link to={"/auth"}>
                        <NavItem></NavItem>
                    </Link>
                }

            </div>

        </section>
    )
}

export default Navigation