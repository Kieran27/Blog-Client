import styles from "./login.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../../Auth/authentication-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, test, testFunction } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      });
      const token = login.data.accessToken;
      const userToken = jwt_decode(token);
      localStorage.setItem("token", JSON.stringify(userToken));
      setUser(userToken);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <span>{user?.username}</span>
    </div>
  );
};

export default Login;
