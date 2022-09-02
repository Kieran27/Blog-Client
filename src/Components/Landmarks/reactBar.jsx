import styles from "./landmarks.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";

const ReactBar = ({ postData }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [stars, setStars] = useState(postData?.stars || 0);
  const [starred, setStarred] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    setStars((stars) => stars + 1);
    setStarred((starred) => !starred);
    setShowTooltip((showTooltip) => !showTooltip);
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
