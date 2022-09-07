import styles from "./modals.module.scss";
import { ClipLoader } from "react-spinners";

const DeleteComment = ({ openDeleteModal, actionPending, deleteComment }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Delete Comment?</h3>
        </div>
        <div className={styles.modalBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nam
            repellendus fugit modi culpa, praesentium officiis repellat eos at
            expedita!
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={openDeleteModal}>Cancel</button>
          <button onClick={deleteComment}>
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

export default DeleteComment;
