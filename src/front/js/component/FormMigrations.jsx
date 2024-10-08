import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormMigrations = ({
  id,
  btnMigration,
  migration: initialMigration,
}) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [migration, setMigration] = useState({
    installation_date: "",
    migration_date: "",
    migration_description: "",
    migration_status: "",
    provider_id: "",
    branch_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMigration({ ...migration, [e.target.name]: e.target.value });
    console.log(migration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza el Migration"
        : "Espere mientras se crea el Migration",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = id
        ? await actions.editMigration(
            id,
            migration.installation_date,
            migration.migration_date,
            migration.migration_description,
            migration.migration_status,
            migration.provider_id,
            migration.branch_id
          )
        : await actions.add_migration(
            migration.installation_date,
            migration.migration_date,
            migration.migration_description,
            migration.migration_status,
            migration.provider_id,
            migration.branch_id
          );
      Swal.fire({
        title: response.title,
        text: response.text,
        icon: response.icon,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/migrations");
        }
      });
    } catch (error) {
      console.error("Error al crear/actualizar migration:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al intentar crear el Migration",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (initialMigration) {
      setMigration({
        installation_date: initialMigration.installation_date
          ? new Date(initialMigration.installation_date)
              .toISOString()
              .split("T")[0]
          : "",
        migration_date: initialMigration.migration_date
          ? new Date(initialMigration.migration_date)
              .toISOString()
              .split("T")[0]
          : "",
        migration_description: initialMigration.migration_description || "",
        migration_status: initialMigration.migration_status || "",
        provider_id: initialMigration.provider_id || "",
        branch_id: initialMigration.branch_id || "",
      });
    }
  }, []);

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="inputTipo" className="form-label">
          Instalación
        </label>
        <input
          type="date"
          className="form-control"
          id="inputTipo"
          value={migration.installation_date}
          name="installation_date"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputMarca" className="form-label">
          Migration
        </label>
        <input
          type="date"
          className="form-control"
          id="inputMarca"
          value={migration.migration_date}
          name="migration_date"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputModelo" className="form-label">
          Descripción
        </label>
        <input
          type="text"
          className="form-control"
          id="inputModelo"
          value={migration.migration_description}
          name="migration_description"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputSerie" className="form-label">
          Estado
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSerie"
          value={migration.migration_status}
          name="migration_status"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="providerSelect" className="form-label">
          Proveedor
        </label>
        <select
          className="form-select"
          name="provider_id"
          id="providerSelect"
          value={migration.provider_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un proveedor</option>
          {store.providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.company_name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <select
          className="form-select"
          name="branch_id"
          aria-label="Default select example"
          value={migration.branch_id}
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
      <div className="col-12">
        <hr />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Cargando..." : btnMigration}
          </button>
        </div>
      </div>
    </form>
  );
};
