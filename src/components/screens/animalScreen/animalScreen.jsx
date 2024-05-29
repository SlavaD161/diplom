import { useEffect, useState } from "react"
import Layout from "../../layout/layout"
import Wrapper from "../../layout/wrapper"
import Footer from "../../shared/footer/footer"
import Topbar from "../../ui/topbar/topbar"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 
import { app, db } from "../../../firebase/firebase"
import Loader from "../../shared/loader/loader"
import Card from "../../ui/card/card"
import Title from "../../ui/title/title"
import Button from "../../ui/button/button"
import CommentSection from "../../commentsection/commentsection"



const AnimalScreen = () => {

    
    let params = new URL(document.location).searchParams;
    let URLName = params.get("name");

    const [userName, setUserName] = useState(null);

    const [animals, loading] = useCollection(
        collection(getFirestore(app), 'animals'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const [rate1, setRate1] = useState(false)
    const [rate2, setRate2] = useState(false)
    const [rate3, setRate3] = useState(false)
    const [rate4, setRate4] = useState(false)
    const [rate5, setRate5] = useState(false)

    const [rating, setRating] = useState(5)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        
        let ratingsArr = animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings.split(", ").filter(i => i != "")

        let sum = ratingsArr?.reduce(function (acc, val) {
            return Number(acc) + Number(val);
        }, 0);

        setRating(Math.floor(sum / ratingsArr?.length))

    }, [animals])

   

    const median = arr => {
        const mid = Math.floor(arr.length / 2),
         nums = [...arr].sort((a, b) => Number(a) - Number(b));
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const rateAnimal = async () => {
        const animalRef = doc(db, 'animals', URLName);

        if (rate5) {
            await setDoc(animalRef, {
                ratings: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings}, ${5}`
            }, { merge: true }).then(res => document.getElementById("ratemodal").close())   
        } else if (rate4) {
            await setDoc(animalRef, {
                ratings: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings}, ${4}`
            }, { merge: true }).then(res => document.getElementById("ratemodal").close())   
        } else if (rate3) {
            await setDoc(animalRef, {
                ratings: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings}, ${3}`
            }, { merge: true }).then(res => document.getElementById("ratemodal").close())   
        } else if (rate2) {
            await setDoc(animalRef, {
                ratings: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings}, ${2}`
            }, { merge: true }).then(res => document.getElementById("ratemodal").close())   
        } else if (rate1) {
            await setDoc(animalRef, {
                ratings: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratings}, ${1}`
            }, { merge: true }).then(res => document.getElementById("ratemodal").close())   
        } 

        await setDoc(animalRef, {
            ratedBy: `${animals?.docs.filter(i => i.data().name == URLName)[0].data().ratedBy}, ${localStorage.getItem("user")}`
        }, { merge: true }).then(res => document.getElementById("ratemodal").close())

    }


    const getImagePath = (name) => {
        return `/images/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    };


    return (
        <div>

            {
                loading &&
                <Loader/>
            }

            <Wrapper>
                <Layout>

                    <div>

                        <Topbar
                            linkName={URLName}
                            title={URLName}
                        />

                        <div className="mt-[40px]">
                            {
                                animals?.docs.filter(i => i.data().name == URLName).map(i => (
                                    <div key={i.id} className="flex flex-col md:flex-row justify-start items-start">

                                        <div className="w-full md:w-6/12">
                                            <img className="object-cover w-full max-h-[500px] rounded-3xl" src={getImagePath(i.data().name)} alt={i.data().name} />
                                        </div>

                                        <div className="md:ml-[30px] mt-[15px]">
                                            <h1 className="text-4xl font-semibold text-black">{i.data().name}</h1>

                                            <div className="rating rating-md mt-[10px]">
                                                <input disabled type="radio" name={`rating-${i.id}`} className="mask mask-star-2 bg-yellow-400" checked={rating == 1 ? true : false} />
                                                <input disabled type="radio" name={`rating-${i.id}`} className="mask mask-star-2 bg-yellow-400" checked={rating == 2 ? true : false} />
                                                <input disabled type="radio" name={`rating-${i.id}`} className="mask mask-star-2 bg-yellow-400" checked={rating == 3 ? true : false} />
                                                <input disabled type="radio" name={`rating-${i.id}`} className="mask mask-star-2 bg-yellow-400" checked={rating == 4 ? true : false} />
                                                <input disabled type="radio" name={`rating-${i.id}`} className="mask mask-star-2 bg-yellow-400" checked={rating >= 5 ? true : false} />
                                            </div>

                                            <div className="mt-[25px] flex flex-col gap-1">
                                                <p className="text-[18px] text-[#242424]">Категория: {i.data().category}</p>
                                                <p className="text-[18px] text-[#242424]">Биом: {i.data().biom}</p>
                                                <p className="text-[18px] text-[#242424]">Место проживания: {i.data().location}</p>
                                                <p className="text-[18px] text-[#242424]">Масса: {i.data().mass}</p>
                                                <p className="text-[18px] text-[#242424]">Размер: {i.data().size}</p>
                                                <p className="text-[18px] text-[#242424]">Скорость: {i.data().speed}</p>
                                            </div>

                                            

                                            
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                        
                        <div className="mt-[40px]">
                        <h1 className="text-2xl font-semibold text-black mb-[20px] ">Описание</h1>
                            {
                            animals?.docs.filter(i => i.data().name == URLName).map(i => (
                                
                                <div key={i.id} className="flex justify-start items-center">

                                    <p className="text-[17px] text-[#504f4f]">
                                        {i.data().desc}
                                    </p>

                                    
                                </div>
                            ))

                            }
                            {
                            animals?.docs.filter(i => i.data().name == URLName).map(i => (
                                <div key={i.id} className="flex justify-end items-center mt-[20px] ">
                                    {
                                                localStorage.getItem("isLogined")
                                                &&
                                                <div>
                                                    {
                                                        !i.data().ratedBy?.toString().includes(localStorage.getItem("user"))
                                                        ?
                                                        <div onClick={() => document.getElementById('ratemodal').showModal()} className="w-fit mt-[20px]">
                                                            <Button
                                                                rightIcon={
                                                                    <div className="rating rating-sm mb-2">
                                                                        <input type="radio" name={"rate"} className="mask mask-star-2 bg-yellow-400" checked />
                                                                    </div>
                                                                }
                                                            >
                                                                <p>Оценить</p>
                                                            </Button>
                                                        </div>
                                                        :
                                                        <p className="mt-[20px] text-lg text-[#494949]">Уже оценен!</p>
                                                    }
                                                </div>
                                            }


                                            <dialog id="ratemodal" className="modal">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-2xl text-center">Оцените животное.</h3>
                                                    <div className="flex justify-center mt-[20px]">
                                                        <div className="rating rating-lg">
                                                            <input checked={rate1} onClick={() => setRate1(prev => !prev)} type="radio" name={"rate_animal"} className="mask mask-star-2 bg-yellow-400" />
                                                            <input checked={rate2} onClick={() => setRate2(prev => !prev)} type="radio" name={"rate_animal"} className="mask mask-star-2 bg-yellow-400" />
                                                            <input checked={rate3} onClick={() => setRate3(prev => !prev)} type="radio" name={"rate_animal"} className="mask mask-star-2 bg-yellow-400" />
                                                            <input checked={rate4} onClick={() => setRate4(prev => !prev)} type="radio" name={"rate_animal"} className="mask mask-star-2 bg-yellow-400" />
                                                            <input checked={rate5} onClick={() => setRate5(prev => !prev)} type="radio" name={"rate_animal"} className="mask mask-star-2 bg-yellow-400" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-[20px] flex justify-center">
                                                        <div onClick={rateAnimal} className="w-fit">
                                                            <Button
                                                                rightIcon={
                                                                    <div className="rating rating-sm mb-2">
                                                                        <input type="radio" name={"rate"} className="mask mask-star-2 bg-yellow-400" checked />
                                                                    </div>
                                                                }
                                                            >
                                                                <p>Оценить</p>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <form method="dialog" className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>

                                    
                                </div>
                            ))

                            }
                            
                            
                            
                        </div>
                        <div className="mt-[40px]">
                            <Title title={"Комментарии"}/>
                            <CommentSection animalId={URLName} userId={localStorage.getItem("user")} />
                        </div>
                        

                        <div className="mt-[40px]">
                            <Title title={"Другие животные"}/>
                            
                        </div>

                        <div className="mt-[30px] flex flex-wrap justify-center md:justify-start gap-[20px] items-center gap-y-[40px]">

                            {
                                animals?.docs.reverse().slice(0, 4).map(i => (
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
                        
                    </div>

                </Layout>
            </Wrapper>

            {!loading && <Footer/>}
        </div>
    )
}

export default AnimalScreen