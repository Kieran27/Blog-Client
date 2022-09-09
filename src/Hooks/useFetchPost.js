import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPost = (postId) => {
  const [postData, setPostData] = useState(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `https://evening-fjord-72509.herokuapp.com/api/posts/${postId?.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
        console.log(postData);
        setPostLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  return { postData, postLoading };
};
