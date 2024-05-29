import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Button from "../ui/button/button"

const AddComment = ({ animalId, userId }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        if (newComment.trim()) {
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
                userId: userId, // Добавляем идентификатор пользователя
                text: newComment,
                timestamp: serverTimestamp(),
            });
            setNewComment('');
        }
    };

    return (
        <div className="comment-form">
            <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Добавьте комментарий..."
            ></textarea>
            <Button onClick={handleAddComment}>Отправить</Button>
        </div>
    );
};

export default AddComment;
