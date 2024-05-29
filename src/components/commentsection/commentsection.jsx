import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import CommentsList from "../commentlist/commentlist"
import AddComment from "../addcomment/addcomment"

const CommentSection = ({ animalId, userId }) => { // Добавляем userId
    return (
        <div className="comment-section">
            <CommentsList animalId={animalId} />
            <AddComment animalId={animalId} userId={userId} /> {/* Передаем userId */}
        </div>
    );
};

export default CommentSection;
