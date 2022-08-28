import React from "react";
import styles from "./landmarks.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <p>
          <strong>Bloggr</strong> - A functional, fullstack blogging site
        </p>
        <p>
          Built with the <strong>MERN</strong> stack and hard work
        </p>
        <p>
          Developed by <strong>Kieran Singh</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
