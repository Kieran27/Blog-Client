import styles from "./modals.module.scss";
import { ClipLoader } from "react-spinners";

const DeletePost = ({ openDeletePostModal, actionPending, deletePost }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Delete Post?</h3>
        </div>
        <div className={styles.modalBody}>
          <p>
            Warning. Deleting this post will remove post entirely as well as all
            comments associated with it. Please read carefully before deciding
            on this action. Continue?
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={openDeletePostModal}>Cancel</button>
          <button onClick={deletePost}>
            {actionPending ? (
              <ClipLoader color={"#fff"} loading={actionPending} size={20} />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
