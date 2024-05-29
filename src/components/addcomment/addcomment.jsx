import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Button from "../ui/button/button"

const AddComment = ({ animalId, userId, updateComments }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const timestamp = new Date().toString(); // Преобразуем текущее время в строку
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
                userId: userId,
                text: newComment,
                timestamp: timestamp, // Используем строку в качестве времени комментария
            });
            setNewComment('');
            updateComments(); // Обновляем список комментариев после добавления нового комментария
        }
    };

    return (
        <div className="comment-form mt-[40px] flex flex-col items-center">
            <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Добавьте комментарий..."
                className="w-full max-w-[600px] h-[150px] p-4 border border-gray-300 rounded"
            >

            </textarea>
            <Button
                onClick={handleAddComment}
                
                classNames="btn mt-4 px-[35px] text-[17px] border-0 flex items-center hover:-translate-x-0.5 gap-1.5 text-[#fff] font-normal"
                bg="#2EBB77"
                hoverBg="#3166AF"
            >
                Отправить
            </Button>
        </div>

    );
};

export default AddComment;
