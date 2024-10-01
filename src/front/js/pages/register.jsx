import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const Register = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    names: "",
    last_names: "",
    employee_number: "",
    subzone: "",
  });

  useTokenExpiration();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  const setActiveOn = (e) => {
    if (active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
    console.log(active);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const response = await actions.register(
      user.userName,
      user.password,
      user.names,
      user.last_names,
      user.employee_number,
      user.subzone,
      active,
      user.rol
    );
    if (response.ok) {
      alert("usuario creado correctamente");
    }
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

  useEffect(() => {
    getTokenInfo();
    if (getTokenInfo() !== "Master" && getTokenInfo() !== "Admin") {
      navigate("/");
    }
  }, []);

  return (
    <div className="mt-5">
      <form className="cointainer card" onSubmit={handleSubmitRegister}>
        <div className="card-body">
          <h2 className="text-center">Registro Nuevo Usuario</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              Nombre de Usuario
            </label>
            <input
              type="userName"
              name="userName"
              className="form-control"
              id="exampleInputuserName1"
              value={user.userName}
              aria-describedby="userNameHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              Nombres
            </label>
            <input
              type="userName"
              name="names"
              className="form-control"
              id="exampleInputuserName1"
              value={user.names}
              aria-describedby="userNameHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              Apellidos
            </label>
            <input
              type="userName"
              name="last_names"
              className="form-control"
              id="exampleInputuserName1"
              value={user.last_names}
              aria-describedby="userNameHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              Numero de Empleado
            </label>
            <input
              type="userName"
              name="employee_number"
              className="form-control"
              id="exampleInputuserName1"
              value={user.employee_number}
              aria-describedby="userNameHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              Subzona
            </label>
            <input
              type="userName"
              name="subzone"
              className="form-control"
              id="exampleInputuserName1"
              value={user.subzone}
              aria-describedby="userNameHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <div className="form-grup">
              <label htmlFor="exampleInputuserName1" className="form-label">
                Rol
              </label>
              <select
                id="rol"
                className="form-control"
                value={user.rol}
                name="rol"
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">...</option>
                {store.rol.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              name="is_active"
              value={user.is_active ? user.is_active : true}
              id="is_active"
              onChange={(e) => setActiveOn(e)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Activo
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
