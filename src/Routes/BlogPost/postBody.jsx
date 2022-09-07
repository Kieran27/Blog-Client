import styles from "./post.module.scss";
import UpdatePost from "../../Components/Widgets/updatePost.jsx";
import { useAuth } from "../../Auth/authentication-context";
import { AiOutlineEdit } from "react-icons/ai";

const PostBody = ({
  postData,
  editPost,
  actionPending,
  openEditPost,
  updatePost,
}) => {
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
          actionPending={actionPending}
          openEditPost={openEditPost}
          updatePost={updatePost}
        />
      )}
    </div>
  );
};

export default PostBody;
