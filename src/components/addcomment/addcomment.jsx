import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const AddComment = ({ animalId, userId, updateComments }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        if (newComment.trim()) {
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
                userId: userId,
                text: newComment,
                timestamp: serverTimestamp(),
            });
            setNewComment('');
            updateComments(); // Обновляем список комментариев после добавления нового комментария
        }
    };

    return (
        <div className="comment-form mt-[40px]">
            <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Добавьте комментарий..."
            ></textarea>
            <button onClick={handleAddComment}>Отправить</button>
        </div>
    );
};

export default AddComment;
