import React from "react";
import styles from "./widgets.module.scss";
import { AiOutlineComment, AiOutlineStar, AiOutlineRead } from "react-icons/ai";
import { readTime } from "../../Util/utlity-functions";

const PostWidger = ({ post }) => {
  return (
    <div className={styles.postWidgetContainer}>
      <div className={styles.postWidgetHeader}>
        <div className={styles.postWidgetAvatar}></div>
        <div className={styles.postWidgetUser}>
          {post.author}
          <br />
          {post.timestamp.slice(0, 7)}
        </div>
      </div>
      <div className={styles.postWidgetBody}>
        <h3>{post.title}</h3>
      </div>
      <div className={styles.postWidgetFooter}>
        <div className={styles.postWidgetFooterLeft}>
          <div>
            <AiOutlineStar />
            {post.stars === 1 ? `${post.stars} Star` : `${post.stars} Stars`}
          </div>
          <div>
            <AiOutlineComment />
            {`${post.comments.length} Comments`}
          </div>
        </div>
        <div className={styles.postWidgetFooterRight}>
          <AiOutlineRead />
          {`${readTime(post.content)} Min Read Time`}
        </div>
      </div>
    </div>
  );
};

export default PostWidger;
