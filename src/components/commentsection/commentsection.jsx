import React, { useState } from 'react';
import CommentsList from "../commentlist/commentlist";
import AddComment from "../addcomment/addcomment";

const CommentSection = ({ animalId, userId }) => {
    const [commentsUpdated, setCommentsUpdated] = useState(false);

    const updateComments = () => {
        setCommentsUpdated(!commentsUpdated);
    };

    return (
        <div className="comment-section">
            <CommentsList animalId={animalId} commentsUpdated={commentsUpdated} />
            <AddComment animalId={animalId} userId={userId} updateComments={updateComments} />
        </div>
    );
};

export default CommentSection;
