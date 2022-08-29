import styles from "./widgets.module.scss";
import { useState } from "react";

const UpdateComment = ({ comment, editOpen, updateComment }) => {
  const [commentContent, setCommentContent] = useState(comment.content);

  const handleSubmit = (e) => {
    const commentId = e.target.parentElement.parentElement.id;
    return updateComment(commentId, commentContent);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  return (
    <div className={styles.createCommentContainer} id={comment._id}>
      <div className="avatar-placeholder"></div>
      <div className={styles.createCommentForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              cols="15"
              rows="10"
              required
              placeholder="Edit Comment..."
              value={commentContent}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.errorContainer}></div>
          <div className={styles.createCommentFormFooter}>
            <button type="button" onClick={editOpen}>
              Cancel
            </button>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
