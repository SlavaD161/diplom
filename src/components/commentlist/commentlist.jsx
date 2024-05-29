import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const CommentsList = ({ animalId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, 'comments'), where('animalId', '==', animalId));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => doc.data());
            setComments(commentsData);
        };

        fetchComments();
    }, [animalId]);

    return (
        <div className="comments-list">
            
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <p><strong>{comment.userName}:</strong> {comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
