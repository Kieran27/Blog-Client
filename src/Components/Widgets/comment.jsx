import styles from "./widgets.module.scss";
import { useAuth } from "../../Auth/authentication-context";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";

const Comment = ({ comment, openDeleteModal, showEdit }) => {
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
            {comment.author} {comment.timestamp}
          </div>
          {username !== !username && comment.author === username ? (
            <div>
              <button onClick={openDeleteModal} id="comment-dlt-btn">
                <AiOutlineDelete />
              </button>
              <button onClick={showEdit}>
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
