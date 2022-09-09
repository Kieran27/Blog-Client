import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get(
          "https://evening-fjord-72509.herokuapp.com/api/posts"
        );
        setLoading(false);
        const postData = posts.data.posts;
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading };
};
