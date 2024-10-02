import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import img from "../../img/drapp_logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    actions.logout();
    navigate("/");
  };

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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <i class="fa-solid fa-bars fs-3"></i>
        </span>
      </button>
      <div className="collapse navbar-collapse pe-2" id="navbarNavDropdown">
        <div className="container-fluid">
          <img
            className="d-inline-block align-text-top"
            src={img}
            alt="DR-App"
            height={80}
            width={80}
          />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Utilidades
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className={
                    getTokenInfo() !== "Master" && getTokenInfo() !== "Admin"
                      ? "d-none"
                      : "dropdown-item"
                  }
                  onClick={(e) => navigate("/register")}
                >
                  Registro Usuario
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar Branch
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar Proveedor
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar Activo
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar Usuario MB
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Agregar Migración
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <button className="btn" onClick={(e) => logout(e)}>
              <i className="fa-solid fa-right-from-bracket fs-4 text-danger"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
