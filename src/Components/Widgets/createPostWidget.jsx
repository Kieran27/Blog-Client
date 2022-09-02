import styles from "./widgets.module.scss";
import { Link } from "react-router-dom";

const CreatePostWidget = () => {
  return (
    <div className={styles.createPostWidget}>
      <Link to="/createpost">Create Post</Link>
    </div>
  );
};

export default CreatePostWidget;
