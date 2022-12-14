import { useState, useEffect } from "react";
import styles from "./homepage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/authentication-context";
import PostWidget from "../../Components/Widgets/postWidget.jsx";
import BloggingImage from "../../Assets/Blogging.svg";
import CreatePostWidget from "../../Components/Widgets/createPostWidget.jsx";
import ClipLoader from "react-spinners/ClipLoader";

const Homepage = () => {
  const [posts, setPosts] = useState(null);
  const [loadingInProgress, setLoading] = useState(true);
  const { user } = useAuth();

  const override = {
    marginBottom: "3rem",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get(
          "https://evening-fjord-72509.herokuapp.com/api/posts"
        );
        setLoading(false);
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
            {user ? (
              <Link to="/createpost">Create Now</Link>
            ) : (
              <Link to="/signup">Join Now</Link>
            )}
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
            <Link to="/createpost">Create Post</Link>
          </div>
        </div>
        <div className={styles.loadingContainer}>
          <ClipLoader
            color={"red"}
            loading={loadingInProgress}
            cssOverride={override}
            size={100}
          />
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
