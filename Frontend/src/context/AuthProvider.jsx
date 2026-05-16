import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { userProfile } from "../services/AuthServices.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const data = await userProfile();
        if (data.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    authCheck();
  }, []);

  const login = (userdata) => {
    setUser(userdata);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  const updateUserProfile = (updateData) => {
    setUser(updateData);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, login, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
