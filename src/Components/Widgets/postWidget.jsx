import React from "react";
import styles from "./widgets.module.scss";

const PostWidger = () => {
  return (
    <div className={styles.postWidgetContainer}>
      <div className={styles.postWidgetHeader}></div>
      <div className={styles.postWidgetBody}></div>
      <div className={styles.postWidgetFooter}></div>
      PostWidger
    </div>
  );
};

export default PostWidger;
