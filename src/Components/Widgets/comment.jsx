import styles from "./widgets.module.scss";

const Comment = ({ comment }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContainerLeft}>
        <div className="avatar-placeholder"></div>
      </div>
      <div className={styles.commentContainerRight}>
        <div className={styles.commentContainerRightHeader}>
          {comment.author} {comment.timestamp}
        </div>
        <div className={styles.commentContainerRightBody}>
          {comment.content}
        </div>
      </div>
    </div>
  );
};

export default Comment;
