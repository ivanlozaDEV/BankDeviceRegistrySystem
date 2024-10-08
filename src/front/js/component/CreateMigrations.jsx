import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FormMigrations } from "./FormMigrations.jsx";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Importamos la librería xlsx para leer el archivo Excel

export const CreateMigrations = () => {
  const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [provider_id, setProviderId] = useState("");
  const [branch_id, setBranchId] = useState("");
  const { store, actions } = useContext(Context);

  // Función para manejar la carga de archivos Excel
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Función para procesar el archivo Excel y agregar los datos
  const handleFileUpload = () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha seleccionado ningún archivo.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Asumimos que hay una sola hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Verificamos que los datos tengan el formato correcto
      const [header, ...rows] = jsonData;
      const expectedColumns = [
        "Instalación",
        "Migración",
        "Descripción",
        "Estado",
      ];

      const missingColumns = expectedColumns.filter(
        (col) => !header.includes(col)
      );

      if (missingColumns.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Error en el formato",
          html: `<p>El archivo no tiene las siguientes columnas requeridas: <b>${missingColumns.join(
            ", "
          )}</b></p>
               <p>El archivo debe tener las siguientes columnas en el encabezado: ${expectedColumns.join(
                 ", "
               )}</p>`,
        });
        return;
      }

      // Si el formato es correcto, procesamos cada fila
      rows.forEach((row) => {
        const [
          installation_date,
          migration_date,
          migration_description,
          migration_status,
        ] = row;

        // Formateamos las fechas a 'YYYY-MM-DD'
        const formattedInstallationDate = new Date(installation_date)
          .toISOString()
          .split("T")[0];
        const formattedMigrationDate = new Date(migration_date)
          .toISOString()
          .split("T")[0];

        actions.add_migration(
          formattedInstallationDate,
          formattedMigrationDate,
          migration_description,
          migration_status,
          provider_id,
          branch_id
        );
      });

      Swal.fire({
        icon: "success",
        title: "Archivo procesado correctamente",
        text: "Las migraciones han sido agregadas.",
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createMigrationModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createMigrationModal"
        tabIndex="-1"
        aria-labelledby="createMigrationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createMigrationModal">
                Crear Migración
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Input para cargar archivo Excel */}
              <h5>Cargar Archivo Excel</h5>
              <div className="mb-3">
                <div className="row">
                  <div className="col-12 col-md-8">
                    <input
                      className="form-control"
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <select
                      className="form-select"
                      name="provider_id"
                      aria-label="Seleccionar proveedor"
                      value={provider_id}
                      onChange={(e) => setProviderId(e.target.value)}
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
                      value={branch_id}
                      onChange={(e) => setBranchId(e.target.value)}
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
                </div>
                <button
                  onClick={handleFileUpload}
                  className="btn btn-primary w-100 mt-2"
                >
                  Cargar Archivo Excel
                </button>
              </div>

              <h5>Formulario de Agregar Migración</h5>
              <FormMigrations btnMigration={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
