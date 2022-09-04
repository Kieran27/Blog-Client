import styles from "./post.module.scss";
import { format, parseISO } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../../Auth/authentication-context";
import { useEffect } from "react";

const PostHeader = ({ postData, openDeletePostModal }) => {
  const { user } = useAuth();

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    console.log(postData?.timestamp);
    const timestamp = postData?.timestamp;
    if (timestamp) {
      const date = format(parseISO(timestamp), "dd MM yyyy");
      console.log(date);
    }
  }, [postData?.timestamp]);

  return (
    <div className={styles.postContentHeader}>
      <div>
        <span>{`by ${postData?.author}`}</span>
        <span>{`On ${formatDate(postData?.timestamp)}`}</span>
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
