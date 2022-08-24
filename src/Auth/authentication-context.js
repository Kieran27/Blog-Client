import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext(null);

// wrapper for the provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrormessage] = useState(null);

  const logout = async () => {
    try {
      const logoutRes = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            "x-auth-token": user.refreshToken,
          },
        }
      );
      localStorage.removeItem("token");
      setUser(null);
      alert(logoutRes.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      if (errorMessage) setErrormessage(null);
      const login = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      });
      const token = login.data.accessToken;
      const userToken = jwt_decode(token);
      const userObj = {
        accessToken: token,
        refreshToken: login.data.refreshToken,
        user: userToken,
      };
      localStorage.setItem("token", JSON.stringify(userObj));
      setUser(userToken);
      console.log(login);
    } catch (error) {
      const message = error.response.data.error;
      setErrormessage(message);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const persistentUser = localStorage.getItem("token");
    if (persistentUser) {
      const parsed = JSON.parse(persistentUser);
      setUser(parsed);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, login, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
