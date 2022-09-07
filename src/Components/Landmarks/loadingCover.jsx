import styles from "./landmarks.module.scss";
import { ClipLoader } from "react-spinners";

const LoadingCover = ({ postLoading }) => {
  return (
    <div className={styles.loadingCover}>
      <ClipLoader color={"red"} loading={postLoading} size={100} />
    </div>
  );
};

export default LoadingCover;
