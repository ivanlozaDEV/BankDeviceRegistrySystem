import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormUserMb = ({ id, btnMB, user: initialUser }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [userMB, setUserMb] = useState({
    user_name_MB: "",
    is_active: false,
    names: "",
    last_names: "",
    employee_number: "",
    branch_id: "",
    asset_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserMb({ ...userMB, [e.target.name]: e.target.value });
  };

  const setIs_activeOnOff = (e) => {
    if (userMB.is_active === true) {
      setUserMb({ ...userMB, is_active: false });
    } else {
      setUserMb({ ...userMB, is_active: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza el Usuario MB"
        : "espere mientras se crea el Usuario MB",
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
        ? await actions.editUserMB(
            id,
            userMB.user_name_MB,
            userMB.is_active,
            userMB.names,
            userMB.last_names,
            userMB.employee_number,
            userMB.branch_id,
            userMB.asset_id
          )
        : await actions.add_userMB(
            userMB.user_name_MB,
            userMB.is_active,
            userMB.names,
            userMB.last_names,
            userMB.employee_number,
            userMB.branch_id,
            userMB.asset_id
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id
          ? "Usuario MB Actualizado"
          : "Usuario MB creado correctamente",
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
        setUserMb({
          user_name_MB: "",
          is_active: "",
          names: "",
          last_names: "",
          employee_number: "",
          branch_id: "",
          asset_id: "",
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
    actions.getUsersMB();
    if (initialUser) {
      setUserMb({
        user_name_MB: initialUser.user_name_MB || "",
        is_active: initialUser.is_active || "",
        names: initialUser.names || "",
        last_names: initialUser.last_names || "",
        employee_number: initialUser.employee_number || "",
        branch_id: initialUser.branch_id,
        asset_id: initialUser.asset_id,
      });
    }
  }, []);
  return (
    <>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="inputTipo" class="form-label">
            Usuario
          </label>
          <input
            type="text"
            class="form-control"
            id="inputTipo"
            value={userMB.user_name_MB}
            name="user_name_MB"
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
            value={userMB.is_active}
            id="is_active"
            checked={userMB.is_active ? userMB.is_active : false}
            onChange={setIs_activeOnOff}
          />
        </div>
        <div class="col-md-6">
          <label for="inputModelo" class="form-label">
            Nombres
          </label>
          <input
            type="text"
            class="form-control"
            id="inputModelo"
            value={userMB.names}
            name="names"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputSerie" class="form-label">
            Apellidos
          </label>
          <input
            type="text"
            class="form-control"
            id="inputSerie"
            value={userMB.last_names}
            name="last_names"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputActivo" class="form-label">
            MB
          </label>
          <input
            type="text"
            class="form-control"
            id="inputActivo"
            value={userMB.employee_number}
            name="employee_number"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            name="branch_id"
            aria-label="Default select example"
            value={userMB.branch_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una Sucursal</option>
            {store.branchs.map((branch, index) => {
              return (
                <option key={index + 1} value={branch.id}>
                  {branch.branch_cr}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            name="asset_id"
            aria-label="Default select example"
            value={userMB.asset_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un activo</option>
            {store.assets.map((asset, index) => {
              return (
                <option key={index + 1} value={asset.id}>
                  {asset.asset_type} - {asset.asset_brand} - {asset.asset_model}
                  -{asset.asset_serial}
                </option>
              );
            })}
          </select>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <button type="submit" className="form-members-submit btn btn-primary">
            {btnMB}
          </button>
        </div>
      </form>
    </>
  );
};
