import styles from "./landmarks.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/authentication-context";
import ClipLoader from "react-spinners/ClipLoader";

const Header = () => {
  const { user, logout, isLoading } = useAuth();

  const handleClick = () => {
    return logout();
  };

  return (
    <header>
      <div className={styles.headerContentWrapper}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <h1>Bloggr</h1>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <ul>
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <button onClick={handleClick}>
                    {isLoading ? "" : "Logout"}
                    <ClipLoader color={"#fff"} loading={isLoading} size={20} />
                  </button>
                </li>
                <li>
                  <Link to="profile">Profile</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
