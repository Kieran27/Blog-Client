import styles from "./landmarks.module.scss";
import axios from "axios";
import { useAuth } from "../../Auth/authentication-context";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState, useEffect } from "react";

const ReactBar = ({ postData, postId }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [stars, setStars] = useState(postData?.stars || 0);
  const [starred, setStarred] = useState(false);

  const { user, validateToken } = useAuth();
  const userId = user?.user.id;

  useEffect(() => {
    setStars(postData?.stars);
  }, [postData?.stars]);

  useEffect(() => {
    if (postData?.starIds.includes(userId)) {
      setStarred(true);
    }
  }, [postData?.starIds, userId]);

  const starPost = async () => {
    try {
      const starRes = axios.post(
        `http://localhost:3000/api/posts/${postId.postid}/star`,
        {
          userId: userId,
        },
        {
          headers: {
            "x-auth-token": user?.refreshToken,
          },
        }
      );
      console.log(starRes);
    } catch (error) {
      validateToken(error);
      console.log(error);
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    if (!user) {
      return alert("Login to Star!");
    }
    if (starred) {
      setStars((stars) => stars - 1);
      setStarred((starred) => !starred);
      setShowTooltip((showTooltip) => !showTooltip);
      starPost();
    } else {
      setStars((stars) => stars + 1);
      setStarred((starred) => !starred);
      setShowTooltip((showTooltip) => !showTooltip);
      starPost();
    }
  };

  return (
    <div className={styles.reactBarContainer}>
      <div className={styles.starContainer}>
        <button
          onClick={handleClick}
          className={`${styles.starBtn} ${starred ? styles.starred : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {starred ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        {showTooltip && <div className={styles.tooltip}>Star Post</div>}
        <span>{stars}</span>
      </div>
    </div>
  );
};

export default ReactBar;
