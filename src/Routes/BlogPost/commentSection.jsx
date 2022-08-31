import styles from "./post.module.scss";
import { useAuth } from "../../Auth/authentication-context";
import Comment from "../../Components/Widgets/comment.jsx";
import CreateComment from "../../Components/Widgets/createComment.jsx";
import LoginReminder from "../../Components/Widgets/loginReminder.jsx";
import UpdateComment from "../../Components/Widgets/updateComment.jsx";

const CommentSection = ({
  postData,
  postId,
  editIndex,
  showEdit,
  editOpen,
  updateComment,
  openDeleteModal,
}) => {
  const { user } = useAuth();

  return (
    <div className={styles.postContentFooter}>
      <h2>{`Discussion (${postData?.comments.length})`}</h2>
      {user ? <CreateComment postId={postId.postid} /> : <LoginReminder />}
      {postData?.comments.map((comment, index) => {
        return editOpen && index === editIndex ? (
          <UpdateComment
            comment={comment}
            key={comment._id}
            editOpen={showEdit}
            updateComment={updateComment}
          />
        ) : (
          <Comment
            comment={comment}
            key={comment._id}
            index={index}
            openDeleteModal={openDeleteModal}
            showEdit={showEdit}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
