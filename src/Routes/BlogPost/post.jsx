import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../Components/Widgets/comment.jsx";
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
        <div className={styles.postContentHeader}>
          <h2>{postData?.title}</h2>
          <div>
            <span>{`by ${postData?.author}`}</span>
            <span>{`On ${postData?.timestamp}`}</span>
          </div>
        </div>
        <div className={styles.postContentBody}>{postData?.content}</div>
        <div className={styles.postContentFooter}>
          <h2>{`Discussion (${postData?.comments.length})`}</h2>
          {postData?.comments.map((comment, index) => {
            return <Comment comment={comment} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Post;
