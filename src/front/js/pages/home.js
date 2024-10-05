import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Adjust the path as needed
import img from "../../img/drapp_logo.png";

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
      <div className="container col col-md-6">
        <form
          className="container card p-5 m-5 rounded-5 shadow-lg  border"
          onSubmit={handleSubmit}
        >
          <div className="img-container m-auto pb-5">
            {" "}
            <img src={img} alt="DR-App" height={200} width={200} />
          </div>
          <h2 className="text-center">Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputEmail1" className="form-label">
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
          </div>
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputPassword1" className="form-label">
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
          <button type="submit" className="btn btn-primary mt-3">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
