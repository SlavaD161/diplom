import React from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

const CommentSection = ({ animalId }) => {
    return (
        <div className="comment-section">
            <CommentsList animalId={animalId} />
            <AddComment animalId={animalId} />
        </div>
    );
};

export default CommentSection;
