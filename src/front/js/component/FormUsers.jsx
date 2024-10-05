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
    is_active: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
        ? await actions.editMe(
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
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="inputUsername" class="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            value={user.user_name}
            name="user_name"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputContrasena" class="form-label">
            Contraseña
          </label>
          <input
            type="text"
            class="form-control"
            id="inputContrasena"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputNombres" class="form-label">
            Names
          </label>
          <input
            type="text"
            class="form-control"
            id="inputNombres"
            value={user.names}
            name="names"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputApellidos" class="form-label">
            Apellidos
          </label>
          <input
            type="text"
            class="form-control"
            id="inputApellidos"
            value={user.last_names}
            name="last_names"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputNumeroDeEmpleado" class="form-label">
            Número de Empleado
          </label>
          <input
            type="text"
            class="form-control"
            id="inputNumeroDeEmpleado"
            value={user.employee_number}
            name="employee_number"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputSubzona" class="form-label">
            Subzona
          </label>
          <input
            type="text"
            class="form-control"
            id="inputSubzona"
            value={user.subzone}
            name="subzone"
            onChange={handleChange}
          />
        </div>
        <div className="form-check form-switch my-4">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Activo
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            name="is_active"
            value={user.is_active ? user.is_active : true}
            id="is_active"
            onChange={(e) => handleChange(e)}
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
