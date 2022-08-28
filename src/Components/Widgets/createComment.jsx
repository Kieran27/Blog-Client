import styles from "./widgets.module.scss";
import { useState } from "react";

const CreateComment = () => {
  const [commentContent, setCommentContent] = useState("");

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.createCommentContainer}>
      <div className="avatar-placeholder"></div>
      <div className={styles.createCommentForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              cols="30"
              rows="10"
              required
              placeholder="Add to the discussion..."
              value={commentContent}
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
