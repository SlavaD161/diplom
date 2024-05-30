import Layout from "../../layout/layout"
import Wrapper from "../../layout/wrapper"
import Footer from "../../shared/footer/footer"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from "firebase/firestore";
import { app } from "../../../firebase/firebase"
import Topbar from "../../ui/topbar/topbar";
import Card from "../../ui/card/card";
import { useEffect, useState } from "react";
import Loader from "../../shared/loader/loader";
import CommentSection from "../../commentsection/commentsection";
import { Link } from "react-router-dom";

const AnimalsScreen = () => {

    let params = new URL(document.location).searchParams;
    let URLCategory = params.get("category");
    let URLSearch = params.get("search");
    let URLContinent = params.get("continent");

    const [animalsFiltered, setAnimalsFiltered] = useState([])

    const [animals, loading] = useCollection(
        collection(getFirestore(app), 'animals'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const [preLocation, setPreLocation] = useState([])
    const [preMass, setPreMass] = useState([])
    const [preSize, setPreSize] = useState([])
    const [preSpeed, setPreSpeed] = useState([])

    useEffect(() => {
        window.scroll(0, 0)
        setAnimalsFiltered(animals?.docs.map(i => i))

    }, [animals])

    useEffect(() => {

        if (animalsFiltered) {
            const set2 = new Set(animalsFiltered?.map(i => i?.data().mass))
            setPreMass(Array.from(set2))

            const set3 = new Set(animalsFiltered?.map(i => i?.data().size))
            setPreSize(Array.from(set3))

            const set4 = new Set(animalsFiltered?.map(i => i?.data().speed))
            setPreSpeed(Array.from(set4))
        } else {
            const set2 = new Set(animals?.docs.map(i => i?.data().mass))
            setPreMass(Array.from(set2))

            const set3 = new Set(animals?.docs.map(i => i?.data().size))
            setPreSize(Array.from(set3))

            const set4 = new Set(animals?.docs.map(i => i?.data().speed))
            setPreSpeed(Array.from(set4))
        }

    }, [animals, animalsFiltered])

    const filterAnimals = (select, selected) => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }

        setAnimalsFiltered(animals?.docs.filter(i => i.data()[select] == selected))

    }

    const filterLocation = (select, value) => {
        setAnimalsFiltered(animals?.docs.filter(i => i?.data()[select].toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <div>

            {
                loading &&
                <Loader />
            }

            <Wrapper>
                <Layout>
                    <div className="mt-[40px]">

                        <Topbar
                            title={URLCategory ? URLCategory : `Все животные ${URLSearch ? "(" + URLSearch + ")" : ""}`}
                            linkName={URLCategory ? URLCategory : `Все животные ${URLSearch ? "(" + URLSearch + ")" : ""}`}
                        />
                        {localStorage.getItem("isLogined") && (

                        <div className="mt-[20px] flex justify-center md:justify-start flex-wrap items-center w-full gap-[10px]">

                            <input onChange={e => filterLocation("location", e.target.value)} className="input input-bordered" placeholder="Континент" />

                            <input onChange={e => filterLocation("biom", e.target.value)} className="input input-bordered" placeholder="Биом" />

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1 font-medium text-[17px]">Вес <span className="rotate-90 text-xs mt-1 ml-1">{">"}</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52">
                                    {
                                        preMass.map(i => (
                                            <li onClick={() => filterAnimals("mass", i)} className="py-2 px-4 cursor-pointer hover:bg-base-200 rounded-lg">{i}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1 font-medium text-[17px]">Размер <span className="rotate-90 text-xs mt-1 ml-1">{">"}</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52">
                                    {
                                        preSize.map(i => (
                                            <li onClick={() => filterAnimals("size", i)} className="py-2 px-4 cursor-pointer hover:bg-base-200 rounded-lg">{i}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1 font-medium text-[17px]">Скорость <span className="rotate-90 text-xs mt-1 ml-1">{">"}</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52">
                                    {
                                        preSpeed.map(i => (
                                            <li onClick={() => filterAnimals("speed", i)} className="py-2 px-4 cursor-pointer hover:bg-base-200 rounded-lg">{i}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </div>
                    )}
                        <div className="mt-[60px]">
                            <div className="mt-[35px] flex flex-wrap justify-center md:justify-start gap-[20px] items-center gap-y-[40px]">

                                {
                                    animalsFiltered?.reverse().map(i => {
                                        if (URLCategory) {

                                            if (i.data().category.toString() == URLCategory?.toString()) {
                                                return <Card
                                                    key={i.id}
                                                    imgUrl={i.data().imgUrl}
                                                    title={i.data().name}
                                                    category={i.data().category}
                                                    ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                                    desc={i.data().desc}
                                                />
                                            }

                                        } else {

                                            if (URLSearch) {
                                                if (i.data().name.toString().toLowerCase().includes(URLSearch.toLowerCase())) {
                                                    return <Card
                                                        key={i.id}
                                                        imgUrl={i.data().imgUrl}
                                                        title={i.data().name}
                                                        category={i.data().category}
                                                        ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                                        desc={i.data().desc}
                                                    />
                                                }
                                            } else if (URLContinent) {
                                                if (i.data().location.split(", ").includes(URLContinent)) {
                                                    return <Card
                                                        key={i.id}
                                                        imgUrl={i.data().imgUrl}
                                                        title={i.data().name}
                                                        category={i.data().category}
                                                        ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                                        desc={i.data().desc}
                                                    />
                                                }
                                            } else {
                                                return <Card
                                                    key={i.id}
                                                    imgUrl={i.data().imgUrl}
                                                    title={i.data().name}
                                                    category={i.data().category}
                                                    ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                                    desc={i.data().desc}
                                                />
                                            }
                                        }
                                    })
                                }
    
                            </div>
                        </div>
    
                    </div>
                </Layout>
            </Wrapper>
            {!loading && <Footer />}
        </div>
    
    )
    }
    
    export default AnimalsScreen;
      