import React from "react";
import styles from "./landmarks.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={styles.headerLeft}>
        <Link to="/">
          <h1>Bloggr</h1>
        </Link>
      </div>
      <div className={styles.headerRight}>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/posts">Signup</Link>
          </li>
          <li>
            <Link to="/signup">Posts</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
