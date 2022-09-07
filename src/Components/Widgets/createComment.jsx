import styles from "./widgets.module.scss";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../Auth/authentication-context.js";
import { useState } from "react";

const CreateComment = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, validateToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const username = user?.user.username;

  const createComment = async (comment) => {
    try {
      if (errorMessage) setErrorMessage(null);
      const res = await axios.post(
        `https://evening-fjord-72509.herokuapp.com/api/posts/${postId}/comments`,
        {
          name: username,
          content: comment,
        },
        {
          headers: {
            "x-auth-token": user?.refreshToken,
          },
        }
      );
      alert("Comment Posted!");
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      validateToken(error);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    return createComment(commentContent);
  };

  const handleFocus = () => {
    if (!showSubmit) {
      setShowSubmit((showSubmit) => !showSubmit);
    }
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
          <div className={styles.errorContainer}>
            <span>{errorMessage}</span>
          </div>
          {showSubmit ? (
            <div className={styles.createCommentFormFooter}>
              <button onClick={handleClick}>Cancel</button>
              <button type="submit" value="Submit">
                {isLoading ? (
                  <ClipLoader color={"#fff"} loading={isLoading} size={20} />
                ) : (
                  "Submit"
                )}
              </button>
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
