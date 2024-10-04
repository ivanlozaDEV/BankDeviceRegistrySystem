import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormProviders = ({
  id,
  btnProvider,
  provider: initialProvider,
}) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [provider, setProvider] = useState({
    branch_id: "",
    company_name: "",
    rfc: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza el Proveedor"
        : "espere mientras se crea el Proveedor",
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
        ? await actions.editProvider(
            id,
            provider.branch_id,
            provider.company_name,
            provider.rfc,
            provider.service
          )
        : await actions.add_provider(
            provider.branch_id,
            provider.company_name,
            provider.rfc,
            provider.service
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id ? "Proveedor Actualizado" : "Proveedor creado correctamente",
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
        setProvider({
          branch_id: "",
          company_name: "",
          rfc: "",
          service: "",
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
    actions.getProviders();
    if (initialProvider) {
      setProvider({
        branch_id: initialProvider.branch_id || "",
        company_name: initialProvider.company_name || "",
        rfc: initialProvider.rfc || "",
        service: initialProvider.service || "",
      });
    }
  }, []);
  return (
    <>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <select
            className="form-select"
            name="branch_id"
            aria-label="Default select example"
            value={provider.branch_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un branch</option>
            {store.branchs.map((branch) => {
              return (
                <option key={branch.id} value={branch.id}>
                  {branch.branch_cr}
                </option>
              );
            })}
          </select>
        </div>
        <div class="col-md-6">
          <label for="inputNombreDeCompania" class="form-label">
            Nombre de la Compañia
          </label>
          <input
            type="text"
            class="form-control"
            id="inputNOmbreDeCompania"
            value={provider.company_name}
            name="company_name"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputRFC" class="form-label">
            RFC
          </label>
          <input
            type="text"
            class="form-control"
            id="inputRFC"
            value={provider.rfc}
            name="rfc"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputServicio" class="form-label">
            Servicio
          </label>
          <input
            type="text"
            class="form-control"
            id="inputServicio"
            value={provider.service}
            name="service"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="form-members-submit btn btn-primary">
            {btnProvider}
          </button>
        </div>
      </form>
    </>
  );
};
