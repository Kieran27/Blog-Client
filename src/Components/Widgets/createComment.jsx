import styles from "./widgets.module.scss";
import { useState } from "react";

const CreateComment = () => {
  const [commentContent, setCommentContent] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFocus = () => {
    setShowSubmit((showSubmit) => !showSubmit);
  };

  const handleClick = () => {
    setShowSubmit((showSubmit) => !showSubmit);
  };

  return (
    <div className={styles.createCommentContainer}>
      <div className="avatar-placeholder"></div>
      <div className={styles.createCommentForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              cols="15"
              rows="10"
              required
              placeholder="Add to the discussion..."
              value={commentContent}
              onChange={handleChange}
              onFocus={handleFocus}
            ></textarea>
          </div>
          <span></span>
          {showSubmit ? (
            <div className={styles.createCommentFormFooter}>
              <button onClick={handleClick}>Cancel</button>
              <input type="submit" value="Submit" />
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
