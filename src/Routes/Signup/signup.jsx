import styles from "../Login/login.module.scss";
import { useState, useEffect } from "react";
import { useAuth } from "../../Auth/authentication-context";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user, login } = useAuth();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    switch (inputName) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordconfirm":
        setPasswordConfirm(value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return login(email, password);
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Signup Now</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <label htmlFor="email">
            Email: <span>*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Email..."
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label htmlFor="username">
            Username: <span>*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username..."
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label htmlFor="password">
            Password: <span>*</span>
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            required
            placeholder="Password..."
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label htmlFor="passwordconfirm">
            Password Confirm: <span>*</span>
          </label>
          <input
            type="text"
            id="passwordconfirm"
            name="passwordconfirm"
            value={passwordConfirm}
            placeholder="Password Confirm..."
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formFooter}>
          <Link to="/">Go Back</Link>
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className={styles.loginContainerFooter}>
        Already A Member?
        <Link to="/login"> Login Here</Link>
      </div>
    </div>
  );
};

export default Signup;
