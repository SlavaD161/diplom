import React, { useState, useEffect } from 'react';
import { addDoc, collection, query, orderBy, limit, onSnapshot, deleteDoc, doc } from 'firebase/firestore'; // Импортируем функции Firestore
import { db } from '../../firebase/firebase';

const AddComment = ({ animalId, userId, updateComments }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Загружаем комментарии и подписываемся на их обновления
        const unsubscribe = subscribeToComments();

        return () => unsubscribe();
    }, []);

    const subscribeToComments = () => {
        // Создаем запрос для получения последних 14 комментариев
        const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'), limit(14));

        // Подписываемся на обновления комментариев
        return onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setComments(commentsData);
        });
    };

    const handleAddComment = async () => {
        if (!userId) {
            setError("Только зарегистрированные пользователи могут оставлять комментарии.");
            setTimeout(() => setError(''), 1600); // Скрыть сообщение об ошибке через 3 секунды
            return; // Прекращаем выполнение функции, если пользователь не зарегистрирован
        }

        if (newComment.trim()) {
            // Если количество комментариев больше 14, удаляем старый комментарий
            if (comments.length >= 12) {
                await deleteOldComment();
            }
            const timestamp = new Date().toString(); // Преобразуем текущее время в строку
            await addDoc(collection(db, 'comments'), {
                animalId: animalId,
                userId: userId,
                text: newComment,
                timestamp: timestamp, // Используем строку в качестве времени комментария
            });
            setNewComment('');
            updateComments(); // Обновляем список комментариев после добавления нового комментария
        }
    };

    const deleteOldComment = async () => {
        // Удаляем старый комментарий (первый в списке)
        const commentToDeleteId = comments[comments.length - 1].id;
        await deleteDoc(doc(db, 'comments', commentToDeleteId));
    };

    return (
        <div className="comment-form mt-[20px] flex flex-col">
            <div className="w-full max-w-[600px] mb-2">
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Добавьте комментарий..."
                    className="w-full h-[150px] p-4 border border-gray-300 rounded"
                />
            </div>
            {error && (
                <dialog id="ratemodal" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-2xl text-center">Недоступно</h3>
                        <p className="text-center">Для отправки комментария необходимо зарегистрироваться!</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Закрыть</button>
                    </form>
                </dialog>
            )}
            <div>
                <button
                    onClick={handleAddComment}
                    className="btn mt-2 px-[35px] text-[17px] border-0 flex items-center hover:-translate-x-0.5 gap-1.5 text-[#fff] font-normal"
                    style={{ backgroundColor: '#2EBB77' }}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default AddComment;
