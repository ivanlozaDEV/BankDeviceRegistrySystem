import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Adjust the path as needed

const Home = () => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(userName);
    console.log(password);
    const success = await actions.login(userName, password);
    if (success) {
      navigate("/masterDashboard");
    } else {
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <form className="cointainer card p-5" onSubmit={handleSubmit}>
        <h2 className="text-center">Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre de usuario
          </label>
          <input
            className="form-control"
            type="text"
            id="user_name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Home;
