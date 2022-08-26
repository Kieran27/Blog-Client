import styles from "./createPost.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [errorsArray, setErrorsArray] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postTitle, postContent);
    alert("Post Created!");
  };

  const createPost = async (title, content) => {
    try {
      const res = await axios.post("http://localhost:3000/api/posts", {
        title: postTitle,
        content: postContent,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      setPostTitle(value);
    }
    if (name === "content") {
      setPostContent(value);
    }
  };

  return (
    <div className={styles.createPostContainer}>
      <h2>Create A Post</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <label htmlFor="title">
            Post Title: <span>*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Post Title..."
            value={postTitle}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label htmlFor="content">
            Post Content: <span>*</span>
          </label>
          <textarea
            name="content"
            id="content"
            cols="120"
            rows="10"
            required
            placeholder="Post Content..."
            value={postContent}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.errorContainer}>
          {errorsArray?.map((error, index) => {
            return (
              <span key={index} className={styles.error}>
                {`* ${error.msg}`}
              </span>
            );
          })}
        </div>
        <span className={styles.error}>
          {errorMessage ? `* Error: ${errorMessage}` : ""}
        </span>
        <div className={styles.formFooter}>
          <Link to="/">Go Back</Link>
          <input type="submit" value="Create Post" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
