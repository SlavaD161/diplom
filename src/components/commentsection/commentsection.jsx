import CommentsList from "../commentlist/commentlist"
import AddComment from "../addcomment/addcomment"


const CommentSection = ({ animalId }) => {
    return (
        <div className="comment-section">
            <CommentsList animalId={animalId} />
            <AddComment animalId={animalId} />
        </div>
    );
};

export default CommentSection;
