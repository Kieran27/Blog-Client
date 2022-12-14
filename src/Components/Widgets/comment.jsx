import styles from "./widgets.module.scss";
import { formatDate } from "../../Util/utlity-functions";
import { useAuth } from "../../Auth/authentication-context";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Comment = ({ comment, index, openDeleteModal, showEdit }) => {
  const { user } = useAuth();
  const username = user?.user.username;

  return (
    <div className={styles.commentContainer} id={comment._id}>
      <div className={styles.commentContainerLeft}>
        <div className="avatar-placeholder"></div>
      </div>
      <div className={styles.commentContainerRight}>
        <div className={styles.commentContainerRightHeader}>
          <div>
            <span>{comment.author}</span>
            <span>{formatDate(comment.timestamp).slice(0, 11)}</span>
          </div>
          {username !== !username && comment.author === username ? (
            <div>
              <button onClick={openDeleteModal} id="comment-dlt-btn">
                <AiOutlineDelete />
              </button>
              <button onClick={() => showEdit(index)}>
                <AiOutlineEdit />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.commentContainerRightBody}>
          {comment.content}
        </div>
      </div>
    </div>
  );
};

export default Comment;
