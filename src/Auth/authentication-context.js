import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext(null);

// wrapper for the provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [errorsArray, setErrorsArray] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const logoutRes = await axios.post(
        "https://evening-fjord-72509.herokuapp.com/api/auth/logout",
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
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const signup = async (email, username, password, passwordConfirm) => {
    try {
      if (errorsArray) setErrorsArray(null);
      if (signupError) setSignupError(null);
      setLoading(true);

      const signupRes = await axios.post(
        "https://evening-fjord-72509.herokuapp.com/api/auth/signup",
        {
          email: email,
          username: username,
          password: password,
          passwordconfirm: passwordConfirm,
        }
      );

      const token = signupRes.data.accessToken;
      const userToken = jwt_decode(token);
      const userObj = {
        accessToken: token,
        refreshToken: signupRes.data.refreshToken,
        user: userToken,
      };

      setLoading(false);
      localStorage.setItem("token", JSON.stringify(userObj));
      setUser(userToken);
    } catch (error) {
      setLoading(false);
      const errors = error.response.data.error;
      const errorIsArray = Array.isArray(errors);
      if (errorIsArray) {
        setErrorsArray(errors);
      } else {
        setSignupError(errors);
      }
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      if (loginError) setLoginError(null);
      const login = await axios.post(
        "https://evening-fjord-72509.herokuapp.com/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      const token = login.data.accessToken;
      const userToken = jwt_decode(token);
      const userObj = {
        accessToken: token,
        refreshToken: login.data.refreshToken,
        user: userToken,
      };
      localStorage.setItem("token", JSON.stringify(userObj));
      setUser(userToken);
      setLoading(false);
      alert(`Logged in as ${userToken.username}`);
      return true;
    } catch (error) {
      setLoading(false);
      const message = error.response.data.error;
      setLoginError(message);
      console.log(error.response.data);
      return false;
    }
  };

  const validateToken = (err) => {
    if (err.response.status === 403) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
      alert("Session Timed Out Please Login Again");
    }
  };

  // Check on initial render if accessToken exists - if so set User
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
        validateToken,
        isLoading,
        loginError,
        signupError,
        errorsArray,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
