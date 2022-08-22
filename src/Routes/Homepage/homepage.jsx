import { useState, useEffect } from "react";
import styles from "./homepage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import BloggingImage from "../../Assets/Blogging.svg";

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
            illum dolorum ducimus consequatur quibusdam ad, reiciendis sit odit
            animi! A illo, eos aperiam beatae iste error sequi voluptatibus
            minus mollitia.
          </p>
        </div>
        <div className={styles.heroRight}>
          <img src={BloggingImage} alt="" />
        </div>
      </section>
      <div>
        <div className={styles.postContainer}>
          {posts?.map((post) => {
            return (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <div className={styles.post}>
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                  <p>{`${post.comments.length} Comments`}</p>
                  <p>{`${post.stars} Stars`}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
