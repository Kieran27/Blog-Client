import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState(null);
  const userId = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `http://localhost:3000/api/posts/${userId.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [userId.postid]);

  return (
    <div>
      <p>{postData?.title}</p>
      <p>{postData?.content}</p>
    </div>
  );
};

export default Post;
