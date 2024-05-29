import Layout from "../../layout/layout"
import Wrapper from "../../layout/wrapper"
import Footer from "../../shared/footer/footer"
import Category from "../../ui/category/category"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from "firebase/firestore"; 
import { app } from "../../../firebase/firebase"
import Topbar from "../../ui/topbar/topbar";
import { useEffect } from "react";
import Loader from "../../shared/loader/loader";

const CategoriesScreen = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const [categories, loading] = useCollection(
        collection(getFirestore(app), 'categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const [animals] = useCollection(
        collection(getFirestore(app), 'animals'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    return (
        <div>

            {
                loading &&
                <Loader/>
            } 

            <Wrapper>
                <Layout>
                    <div className="mt-[40px]">
                        
                        <Topbar
                            title={"Все категории"}
                            linkName={"Все категории"}
                        />
                        {localStorage.getItem("isLogined") && (
                        <div className="mt-[80px]">
                            <div className="mt-[35px] flex justify-center md:justify-start flex-wrap items-center gap-[50px]">

                                {
                                    categories?.docs.map(i => (
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

                            </div>
                        </div>
                        )}
                        
                    </div>
                </Layout>
            </Wrapper>
            {!loading && <Footer/>}
        </div>
    )
}

export default CategoriesScreen