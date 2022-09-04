import styles from "./post.module.scss";
import { formatDate } from "../../Util/utlity-functions";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../../Auth/authentication-context";
import { useState } from "react";
import { useEffect } from "react";

const PostHeader = ({ postData, openDeletePostModal }) => {
  const { user } = useAuth();
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    // Waits for postData to load - then formats timestamp to render
    if (postData?.timestamp) {
      setTimestamp(formatDate(postData?.timestamp));
    }
  }, [postData?.timestamp]);

  return (
    <div className={styles.postContentHeader}>
      <div>
        <span>{`by ${postData?.author}`}</span>
        <span>{`On ${timestamp}`}</span>
      </div>

      {postData?.author === user?.user.username ? (
        <div>
          <button onClick={openDeletePostModal}>
            <AiOutlineDelete />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostHeader;
