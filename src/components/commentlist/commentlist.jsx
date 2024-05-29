import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const CommentsList = ({ animalId, commentsUpdated }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, 'comments'), where('animalId', '==', animalId));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => doc.data());

            // Сортировка комментариев по времени создания в убывающем порядке
            const commentsSortedByTime = commentsData.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });

            setComments(commentsSortedByTime);
        };

        fetchComments();
    }, [animalId, commentsUpdated]);

    return (
        <div className="comments-list">
            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <div key={index} className="comment p-4 bg-gray-100 rounded-lg">
                        <p className="text-gray-800"><strong>{comment.userId} ({comment.userName}):</strong> {comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsList;
