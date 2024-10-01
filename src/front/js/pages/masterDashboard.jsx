import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const masterDashboard = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    actions.logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Este es el Master Dashboard</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        salir
      </button>
    </div>
  );
};

export default masterDashboard;
