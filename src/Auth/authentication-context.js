import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function signUp(email, username, password, passwordconfirm) {
    return axios.post("/api/auth/signup", {
      email,
      username,
      password,
      passwordconfirm,
    });
  }

  async function login(email, password) {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    return "logout";
  }

  useEffect(() => {});

  return (
    <userAuthContext.Provider value={(signUp, login, logout)}>
      {children}
    </userAuthContext.Provider>
  );
}
