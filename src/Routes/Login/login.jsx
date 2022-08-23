import styles from "./login.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../../Auth/authentication-context";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return login(email, password);
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Login Now</h2>
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
        <div className={styles.formFooter}>
          <Link to="/">Go Back</Link>
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className={styles.loginContainerFooter}>
        Not A Member?
        <Link to="signup"> Signup Here</Link>
      </div>
    </div>
  );
};

export default Login;
