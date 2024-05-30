import React, { useState } from 'react';
import CommentsList from "../commentlist/commentlist";
import AddComment from "../addcomment/addcomment";

const CommentSection = ({ animalId, userId }) => {
    const [commentsUpdated, setCommentsUpdated] = useState(false);

    const updateComments = () => {
        setCommentsUpdated(!commentsUpdated);
    };

    const handleSubmitComment = () => {
        // Проверяем, зарегистрирован ли пользователь
        if (userId) {
            // Если пользователь зарегистрирован, обрабатываем отправку комментария
            updateComments(); // Обновляем список комментариев
        } else {
            // Если пользователь не зарегистрирован, показываем сообщение об ошибке или перенаправляем на страницу входа
            alert("Только зарегистрированные пользователи могут оставлять комментарии.");
        }
    };

    return (
        <div className="comment-section">
            <CommentsList animalId={animalId} commentsUpdated={commentsUpdated} />
            <AddComment animalId={animalId} userId={userId} handleSubmitComment={handleSubmitComment}  />
        </div>
    );
};

export default CommentSection;
