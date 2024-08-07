/* eslint-disable react/prop-types */
// src/Lib/AuthContext/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (token && storedUser) {
        try {
          // Optionally validate token with API
          const response = await fetch("/api/validate-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          const result = await response.json();
          if (result.valid) {
            setUser(storedUser);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      }
      setLoading(false); // Set loading to false after all checks
    };

    initializeAuth();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    navigate("/"); // Redirect to home after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
