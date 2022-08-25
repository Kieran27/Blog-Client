import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./post.module.scss";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const userId = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `http://localhost:3000/api/posts/${userId.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
        setCommentData(postData.comments);
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [userId.postid]);

  return (
    <section className={styles.postContainer}>
      <div className={styles.postImgContainer}>
        <img
          src="https://ik.imagekit.io/devtoolstech/hero-graphic_ib35c2NXyL_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642265118782"
          alt=""
        />
      </div>
      <div className={styles.postContentContainer}>
        <div className={styles.postContentHeader}>{postData?.author}</div>
        <div className={styles.postContentBody}>
          <h2>{postData?.title}</h2>
          {postData?.content}
        </div>
      </div>
    </section>
  );
};

export default Post;
