import styles from "./post.module.scss";
import UpdatePost from "../../Components/Widgets/updatePost.jsx";
import { useAuth } from "../../Auth/authentication-context";
import { AiOutlineEdit, AiFillStar, AiOutlineStar } from "react-icons/ai";

const PostBody = ({ postData, editPost, openEditPost, updatePost }) => {
  const { user } = useAuth();

  return (
    <div className={styles.postContentBody}>
      <p>{postData?.content}</p>
      {postData?.author === user?.user.username ? (
        <div className={styles.editPost}>
          <button onClick={openEditPost}>
            <AiOutlineEdit />
          </button>
        </div>
      ) : (
        ""
      )}
      {editPost && (
        <UpdatePost
          postData={postData}
          openEditPost={openEditPost}
          updatePost={updatePost}
        />
      )}
    </div>
  );
};

export default PostBody;
