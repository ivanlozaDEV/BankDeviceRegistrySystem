import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormUsers = ({ id, btnUser, user: initialUser }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    password: "",
    names: "",
    last_names: "",
    employee_number: "",
    subzone: "",
    role: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const setIs_activeOnOff = (e) => {
    if (user.is_active === true) {
      setUser({ ...user, is_active: false });
    } else {
      setUser({ ...user, is_active: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza usuario"
        : "espere mientras se crea usuario",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        container: "custom-container",
        popup: "custom-popup",
        title: "custom-title",
        content: "custom-content",
        confirmButton: "custom-confirm-button",
      },
    });
    try {
      const response = id
        ? await actions.editUser(
            id,
            user.user_name,
            user.password,
            user.names,
            user.last_names,
            user.employee_number,
            user.subzone,
            user.is_active,
            user.role
          )
        : await actions.register(
            user.user_name,
            user.password,
            user.names,
            user.last_names,
            user.employee_number,
            user.subzone,
            user.is_active,
            user.role
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id ? "Usuario Actualizado" : "Usuario creado correctamente",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: "custom-container",
          popup: "custom-popup",
          title: "custom-title",
          content: "custom-content",
          confirmButton: "custom-confirm-button",
        },
      }).then(() => {});
      if (!id) {
        setUser({
          user_name: "",
          password: "",
          names: "",
          last_names: "",
          employee_number: "",
          subzone: "",
          role: "",
          is_active: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema: ${error.message}`,
        customClass: {
          container: "custom-container",
          popup: "custom-popup",
          title: "custom-title",
          content: "custom-content",
          confirmButton: "custom-confirm-button",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
      return;
    }
    actions.getUsers();
    if (initialUser) {
      setUser({
        user_name: initialUser.user_name || "",
        names: initialUser.names || "",
        last_names: initialUser.last_names || "",
        employee_number: initialUser.employee_number || "",
        subzone: initialUser.subzone || "",
        role: initialUser.role || "",
        is_active: initialUser.is_active || "",
      });
    }
  }, []);
  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlhtmlFor="inputUsername" className="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            value={user.user_name}
            name="user_name"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlhtmlFor="inputContrasena" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputContrasena"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlhtmlFor="inputNombres" className="form-label">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNombres"
            value={user.names}
            name="names"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlhtmlFor="inputApellidos" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="inputApellidos"
            value={user.last_names}
            name="last_names"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlhtmlFor="inputNumeroDeEmpleado" className="form-label">
            Número de Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNumeroDeEmpleado"
            value={user.employee_number}
            name="employee_number"
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlhtmlFor="inputSubzona" className="form-label">
            Subzona
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSubzona"
            value={user.subzone}
            name="subzone"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            name="role"
            aria-label="Default select example"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            {store.role.map((role, index) => {
              return (
                <option key={index + 1} value={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-6 form-check form-switch mt-2">
          <label
            className="form-check-label mt-1"
            htmlhtmlFor="flexSwitchCheckDefault"
          >
            Activo
          </label>
          <input
            className="form-check-input m-2"
            type="checkbox"
            role="switch"
            name="is_active"
            value={user.is_active}
            id="is_active"
            checked={user.is_active ? user.is_active : false}
            onChange={setIs_activeOnOff}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="form-members-submit btn btn-primary">
            {btnUser}
          </button>
        </div>
      </form>
    </>
  );
};
