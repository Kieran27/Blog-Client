import { Link } from "react-router-dom";
import styles from "./widgets.module.scss";

const LoginReminder = () => {
  return (
    <div className={styles.loginReminderContainer}>
      <h3>
        <strong>Login</strong> or <strong>Signup</strong> To Join the
        Conversation
      </h3>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default LoginReminder;
