import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import { jwtDecode } from "jwt-decode";

const masterDashboard = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useTokenExpiration();

  const getTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const logout = (e) => {
    e.preventDefault();
    actions.logout();
    navigate("/");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    getTokenInfo();
  }, []);

  return (
    <div>
      <h1>Este es el Master Dashboard</h1>
      <button className="btn btn-danger" onClick={(e) => logout(e)}>
        salir
      </button>
      <button
        className={
          getTokenInfo() !== "Master" && getTokenInfo() !== "Admin"
            ? "d-none"
            : "btn btn-primary"
        }
        onClick={(e) => navigate("/register")}
      >
        Registro
      </button>
    </div>
  );
};

export default masterDashboard;
