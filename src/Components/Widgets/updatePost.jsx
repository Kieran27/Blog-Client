import styles from "./widgets.module.scss";
import { useState } from "react";

const UpdatePost = ({ postData, openEditPost, updatePost }) => {
  const [postUpdate, setPostUpdate] = useState(postData?.content);

  const handleChange = (e) => {
    setPostUpdate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return updatePost(postData.title, postUpdate);
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
              placeholder="Edit Post..."
              value={postUpdate}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.errorContainer}></div>
          <div className={styles.createCommentFormFooter}>
            <button type="button" onClick={openEditPost}>
              Cancel
            </button>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
