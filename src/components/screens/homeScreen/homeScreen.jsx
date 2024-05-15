import { Link } from "react-router-dom"
import Layout from "../../layout/layout"
import Wrapper from "../../layout/wrapper"
import Hero from "../../shared/hero/hero"
import Navigation from "../../shared/navigation/navigation"
import Button from "../../ui/button/button"
import Card from "../../ui/card/card"
import Title from "../../ui/title/title"
import Footer from "../../shared/footer/footer"
import Category from "../../ui/category/category"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from "firebase/firestore"; 
import { app } from "../../../firebase/firebase"
import { useEffect, useState } from "react"
import Loader from "../../shared/loader/loader"

const HomeScreen = () => {

    const [userLocation, setUserLocation] = useState("")

    const [categories, loading] = useCollection(
        collection(getFirestore(app), 'categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const [animals, loading2] = useCollection(
        collection(getFirestore(app), 'animals'),
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

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {        
        if (localStorage.getItem("isLogined")) {
            setUserLocation(users?.docs.filter(i => i.data().email == localStorage.getItem("user"))[0].data().continent)
        }

    }, [animals])

    return (
        <div>

            {
                loading &&
                <Loader/>
            }

            {
                loading2 &&
                <Loader/>
            }

            <Wrapper>
                <Layout>
                    <div className="mt-[20px]">
                        <div className="hidden md:block">
                            <Navigation/>
                        </div>
                        <div className="md:mt-[60px]">
                            <Hero/>
                        </div>
                        <div className="mt-[60px]">
                            <div>

                                <div>
                                    <Title title={"Категории"} />
                                </div>

                                <div className="mt-[35px] flex-wrap flex justify-center md:justify-start items-center gap-[50px]">

                                    {
                                        categories?.docs.slice(0, 4).map(i => (
                                            <Category
                                                key={i.id}
                                                imgUrl={i.data().imgUrl}
                                                title={i.data().name}
                                                category={i.data().desc}
                                                link={`/animals?category=${i.data().name}`}
                                                count={
                                                    animals?.docs.filter(item => item.data().category == i.data().name).length
                                                }
                                            />
                                        ))
                                    }

                                    <Category
                                        imgUrl={"https://oboitd.ru/images/goods/big/20200120021434_Raznye_zhivotnye_3-155.jpg"}
                                        title={"Все категории"}
                                        category={"Посмотреть все категории"}
                                        link={"/categories"}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="mt-[80px]">

                            <div>
                                <Title title={"Животные"} />
                            </div>

                            <div className="mt-[35px] flex flex-wrap justify-center md:justify-start gap-[20px] items-center gap-y-[40px]">

                                {
                                    animals?.docs.reverse().slice(0, 12).map(i => (
                                        <Card
                                            key={i.id}
                                            imgUrl={i.data().imgUrl}
                                            title={i.data().name}
                                            category={i.data().category}
                                            ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                            desc={i.data().desc}
                                        />
                                    ))
                                }

                            </div>

                            <div className="mt-[60px] flex justify-center">
                                <Link to={"/animals"}>
                                    <Button>
                                        <p>Посмотреть все</p>
                                    </Button>
                                </Link>
                            </div>

                        </div>

                        {localStorage.getItem("isLogined") && <div className="mt-[60px]">

                            <div>
                                <Title title={"Животные на вашем континенте"} />
                            </div>

                            <div className="mt-[35px] flex flex-wrap justify-center md:justify-start gap-[20px] items-center gap-y-[40px]">

                                {
                                    animals?.docs.reverse().filter(item => item.data().location.split(", ").includes(userLocation)).slice(0, 4).map(i => (
                                        <Card
                                            key={i.id}
                                            imgUrl={i.data().imgUrl}
                                            title={i.data().name}
                                            category={i.data().category}
                                            ratings={i.data().ratings.split(", ").filter(i => i != "")}
                                            desc={i.data().desc}
                                        />
                                    ))
                                }

                            </div>

                        </div>}

                    </div>
                </Layout>
            </Wrapper>
            {!loading && <Footer/>}
        </div>
    )
}

export default HomeScreen