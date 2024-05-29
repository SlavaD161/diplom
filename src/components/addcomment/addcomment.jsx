import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddComment = ({ animalId }) => {
    const [newComment, setNewComment] = useState('');
    const [user] = useAuthState(auth);

    const handleAddComment = async () => {
        if (newComment.trim() && user) {
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
                text: newComment,
                timestamp: serverTimestamp(),
                userName: user.email, // или user.displayName, если используется displayName
            });
            setNewComment('');
        }
    };

    return (
        <div className="comment-form">
            {user ? (
                <>
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                    ></textarea>
                    <button onClick={handleAddComment}>Отправить</button>
                </>
            ) : (
                <p>Пожалуйста, войдите, чтобы оставлять комментарии.</p>
            )}
        </div>
    );
};

export default AddComment;
