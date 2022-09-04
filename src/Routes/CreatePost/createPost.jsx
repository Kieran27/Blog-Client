import styles from "./createPost.module.scss";
import axios from "axios";
import { useAuth } from "../../Auth/authentication-context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [errorsArray, setErrorsArray] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { user, validateToken } = useAuth();
  const refreshToken = user?.refreshToken;

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postTitle, postContent);
    alert("Post Created!");
  };

  const createPost = async (title, content) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts",
        {
          title: title,
          content: content,
          author: user.user.username,
        },
        {
          headers: {
            "x-auth-token": refreshToken,
          },
        }
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      validateToken(error);
      let errors = error.response.data.message.errors.title.message;
      if (typeof errors !== String) errors = "Oops, something went wrong";
      const errorIsArray = Array.isArray(errors);
      if (errorIsArray) {
        setErrorsArray(errors);
      } else {
        setErrorMessage(errors);
      }
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
            minLength={5}
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
            minLength={1}
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
