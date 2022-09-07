import styles from "./profile.module.scss";
import ConstructionImage from "../../Assets/Construction.svg";
import { useAuth } from "../../Auth/authentication-context";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <img src={ConstructionImage} alt="" />
        <h2>{`Welcome Back ${user?.user.username}!`}</h2>
        <p>
          Unfortunately, this page is still under construction. Check back
          Later!
        </p>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default Profile;
