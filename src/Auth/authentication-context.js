import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext(null);

// wrapper for the provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrormessage] = useState(null);
  const [errorsArray, setErrorsArray] = useState(null);

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

  const signup = async (email, username, password, passwordConfirm) => {
    try {
      if (errorsArray) setErrorsArray(null);
      if (errorMessage) setErrormessage(null);
      const signupRes = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email: email,
          username: username,
          password: password,
          passwordconfirm: passwordConfirm,
        }
      );
      console.log(signupRes);
      const token = signupRes.data.accessToken;
      const userToken = jwt_decode(token);
      const userObj = {
        accessToken: token,
        refreshToken: signupRes.data.refreshToken,
        user: userToken,
      };
      localStorage.setItem("token", JSON.stringify(userObj));
      setUser(userToken);
    } catch (error) {
      const errors = error.response.data.error;
      console.log(errors);
      const errorIsArray = Array.isArray(errors);
      if (errorIsArray) {
        setErrorsArray(errors);
      } else {
        setErrormessage(errors);
      }
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
      value={{
        user,
        setUser,
        logout,
        signup,
        login,
        errorMessage,
        errorsArray,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
