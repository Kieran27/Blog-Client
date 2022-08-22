import styles from "./profile.module.scss";
import { useAuth } from "../../Auth/authentication-context";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return <div>{`Welcome Back ${user?.user.username}!`}</div>;
};

export default Profile;
