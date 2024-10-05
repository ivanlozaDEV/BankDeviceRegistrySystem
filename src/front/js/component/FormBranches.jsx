import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormBranches = ({ id, btnBranch, branch: initialBranch }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [branch, setBranch] = useState({
    branch_cr: "",
    branch_address: "",
    branch_zone: "",
    branch_subzone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza la sucursal"
        : "espere mientras se crea la sucursal",
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
        ? (await actions.editBranch) ==
          (id,
          branch.branch_cr,
          branch.branch_address,
          branch.branch_zone,
          branch.branch_subzone)
        : await actions.add_branch(
            branch.branch_cr,
            branch.branch_address,
            branch.branch_zone,
            branch.branch_subzone
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id ? "Branch Actualizado" : "Branch creado correctamente",
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
        setBranch({
          branch_cr: "",
          branch_address: "",
          branch_zone: "",
          branch_subzone: "",
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
    actions.getBranchs();
    if (initialBranch) {
      setBranch({
        branch_cr: initialBranch.branch_cr || "",
        branch_address: initialBranch.branch_address || "",
        branch_zone: initialBranch.branch_zone || "",
        branch_subzone: initialBranch.branch_subzone || "",
      });
    }
  }, []);
  return (
    <>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="inputCR" class="form-label">
            CR
          </label>
          <input
            type="text"
            class="form-control"
            id="inputCR"
            value={branch.branch_cr}
            name="branch_cr"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputDireccion" class="form-label">
            Dirección de la sucursal
          </label>
          <input
            type="text"
            class="form-control"
            id="inputDireccion"
            value={branch.branch_address}
            name="branch_address"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputZona" class="form-label">
            Zona
          </label>
          <input
            type="text"
            class="form-control"
            id="inputZona"
            value={branch.branch_zone}
            name="branch_zone"
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
            value={branch.branch_subzone}
            name="branch_subzone"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="form-members-submit btn btn-primary">
            {btnBranch}
          </button>
        </div>
      </form>
    </>
  );
};
