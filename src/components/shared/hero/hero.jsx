import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import Slider from '../slider/slider';

import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from "firebase/firestore"; 
import { app } from "../../../firebase/firebase"

export default function Hero() {

    const [categories] = useCollection(
        collection(getFirestore(app), 'categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#2EBB77',
                    '--swiper-pagination-color': '#2EBB77',
                }}
                speed={600}
                spaceBetween={35}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Parallax, Pagination, Navigation]}
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                    data-swiper-parallax="-23%"
                ></div>

                {
                    categories?.docs.reverse().slice(0, 3).map(i => (
                        <SwiperSlide key={i.id}>
                            <Slider
                                title={i.data().name}
                                desc={i.data().desc}
                                link={`/animals?category=${i.data().name}`}
                                imgUrl={i.data().imgUrl}
                            />
                        </SwiperSlide>
                    ))
                }

                

            </Swiper>
        </>
    );
}
