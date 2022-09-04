import styles from "./post.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../../Auth/authentication-context";

const PostHeader = ({ postData, openDeletePostModal }) => {
  const { user } = useAuth();

  return (
    <div className={styles.postContentHeader}>
      <div>
        <span>{`by ${postData?.author}`}</span>
        <span>{`On ${postData?.timestamp}`}</span>
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
