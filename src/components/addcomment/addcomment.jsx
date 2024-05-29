import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const AddComment = ({ animalId }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        if (newComment.trim()) {
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
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
            <button onClick={handleAddComment}>Отправить</button>
        </div>
    );
};

export default AddComment;
