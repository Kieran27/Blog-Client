import styles from "./login.module.scss";
import { useState } from "react";
import { useAuth } from "../../Auth/authentication-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, loginError } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    await navigate("/");
    window.location.reload();
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
            type="password"
            id="password"
            name="password"
            value={password}
            required
            placeholder="Password..."
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>
          {loginError ? `* Error: ${loginError}` : ""}
        </span>
        <div className={styles.formFooter}>
          <Link to="/">Go Back</Link>
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className={styles.loginContainerFooter}>
        Not A Member?
        <Link to="/signup"> Signup Here </Link>
      </div>
    </div>
  );
};

export default Login;
