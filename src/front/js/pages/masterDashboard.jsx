import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import { jwtDecode } from "jwt-decode";
import { Navbar } from "../component/navbar.js";
import "../../styles/index.css";

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

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
      return;
    }
    getTokenInfo();
  }, []);

  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container-fluid">
        <div>
          <div className="card text-center rounded-5 shadow-lg border m-5">
            <div className="card-header">Featured</div>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
            <div className="card-footer text-body-secondary">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default masterDashboard;
