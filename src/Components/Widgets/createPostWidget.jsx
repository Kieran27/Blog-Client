import styles from "./widgets.module.scss";
import { Link } from "react-router-dom";

const CreatePostWidget = () => {
  return (
    <div className={styles.createPostWidget}>
      <h3>Wanna Create?</h3>
      <p>Add More Today</p>
      <Link to="/">Create Post</Link>
    </div>
  );
};

export default CreatePostWidget;
