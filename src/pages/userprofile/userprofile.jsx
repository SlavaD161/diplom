import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../shared/logo/logo';
import Button from '../../ui/button/button';
import { db, app } from '../../firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, doc, setDoc, deleteDoc, query, where } from "firebase/firestore";

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile h-screen flex justify-center pt-20 md:pt-0 md:items-center">
            <div className="bg-[#1212121e] backdrop-blur-sm px-[35px] md:w-fit w-full md:mx-0 mx-5 py-[60px] rounded-2xl shadow-2xl">
                <Link to="/">
                    <div className="flex items-center -ml-6 justify-center gap-[5px]">
                        <Logo withTitle={false} />
                        <h1 className="font-bold text-[18px] text-white ml-[8px]">Animal Exp</h1>
                    </div>
                </Link>

                <div className="mt-[30px] flex flex-col items-center w-full gap-2">
                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Email: {user.email}</p>
                    </div>

                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Страна: {user.country}</p>
                    </div>

                    <div className="w-full">
                        <p className="my-1 mx-1 text-white text-sm">Континент: {user.continent}</p>
                    </div>

                    <div className="flex justify-end mt-[10px] w-full">
                        <div className="w-fit">
                            <Link to="/edit-profile">
                                <Button>
                                    <p>Редактировать профиль</p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
