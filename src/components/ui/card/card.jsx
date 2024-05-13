import { useEffect } from "react"
import { useState } from "react"

const Card = ({imgUrl, title, desc, category, ratings }) => {

    const [rating, setRating] = useState(5)

    useEffect(() => {

        let ratingsArr = ratings

        let sum = ratingsArr?.reduce(function (acc, val) {
            return Number(acc) + Number(val);
        }, 0);

        setRating(Math.floor(sum / ratingsArr?.length))
        
    }, [ratings])

    return (
        <a href={`/animal?name=${title}`}>
            <div className="w-fit">

                <div className="relative">

                    <img className="h-56 object-cover w-[300px] rounded-3xl hover:shadow-2xl opacity-90 hover:opacity-100 transition-all duration-300" src={imgUrl} alt={title} />

                    <span className="badge badge-success absolute top-2 right-3 text-white">{category}</span> 

                    <div className="rating rating-xs absolute top-2 left-3 bg-[#12121291] px-4 py-1 rounded-lg">
                        <input disabled type="radio" name={`rating-${title}${imgUrl}`} className="mask mask-star-2 bg-white" checked={rating == 1 ? true : false} />
                        <input disabled type="radio" name={`rating-${title}${imgUrl}`} className="mask mask-star-2 bg-white" checked={rating == 2 ? true : false} />
                        <input disabled type="radio" name={`rating-${title}${imgUrl}`} className="mask mask-star-2 bg-white" checked={rating == 3 ? true : false} />
                        <input disabled type="radio" name={`rating-${title}${imgUrl}`} className="mask mask-star-2 bg-white" checked={rating == 4 ? true : false} />
                        <input disabled type="radio" name={`rating-${title}${imgUrl}`} className="mask mask-star-2 bg-white" checked={rating >= 5 ? true : false} />
                    </div>

                </div>

                <div className="mt-[5px] flex justify-between items-center px-1">

                    <div className="flex flex-col">
                        <h1 className="text-[20px] text-black font-semibold">{title}</h1>
                        <p className="truncate max-w-[250px]">{desc}</p>
                    </div>

                </div>

            </div>
        </a>
    )
}

export default Card