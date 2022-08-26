import { useState, useEffect } from "react";
import styles from "./homepage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import PostWidget from "../../Components/Widgets/postWidget.jsx";
import BloggingImage from "../../Assets/Blogging.svg";
import createPostWidget from "../../Components/Widgets/createPostWidget.jsx";
import CreatePostWidget from "../../Components/Widgets/createPostWidget.jsx";

const Homepage = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get("http://localhost:3000/api/posts");
        const postData = posts.data.posts;
        console.log(postData);
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <section className={styles.heroContainer}>
        <div className={styles.heroLeft}>
          <h2>Start Blogging</h2>
          <p>
            Join a community of liked minded, amazing devs. Share, stay
            up-to-date and grow your skills and career through a supportive,
            fostering community.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link to="signup">Join Now</Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <img src={BloggingImage} alt="" />
        </div>
      </section>
      <section className={styles.postsContainer}>
        <div className={styles.postContainerHeader}>
          <div>
            <h2>Posts</h2>
            <p>Learn Something New</p>
          </div>
          <div>
            <button disabled={true}>
              <Link to="/createpost">Create Post</Link>
            </button>
          </div>
        </div>
        {posts?.map((post) => {
          return (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <PostWidget post={post} />
            </Link>
          );
        })}
        <CreatePostWidget />
      </section>
    </>
  );
};

export default Homepage;
