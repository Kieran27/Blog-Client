import styles from "./landmarks.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";

const ReactBar = ({ postData }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [starred, setStarred] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip((showTooltip) => !showTooltip);
  };

  const handleMouseLeave = () => {
    setShowTooltip((showTooltip) => !showTooltip);
  };

  return (
    <div className={styles.reactBarContainer}>
      <div className={styles.starContainer}>
        <button
          className={styles.starBtn}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {starred ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        {showTooltip && <div className={styles.tooltip}>Star Post</div>}
        <span>{postData?.stars}</span>
      </div>
    </div>
  );
};

export default ReactBar;
