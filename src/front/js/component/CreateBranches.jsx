import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FormBranches } from "./FormBranches.jsx";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Importamos la librería xlsx para leer el archivo Excel

export const CreateBranches = () => {
  const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const { store, actions } = useContext(Context);

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

      // Asumimos que el archivo tiene una hoja llamada 'Sheet1'
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convertimos los datos a JSON

      // Verificamos que los datos tengan el formato correcto
      const [header, ...rows] = jsonData;
      const expectedColumns = ["CR", "Dirección", "Zona", "Subzona"];

      // Comprobamos si el archivo tiene todas las columnas necesarias
      const missingColumns = expectedColumns.filter(
        (col) => !header.includes(col)
      );

      if (missingColumns.length > 0) {
        // Si faltan columnas, mostramos un mensaje claro con las columnas que faltan
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
        const [branch_cr, branch_address, branch_zone, branch_subzone] = row;
        console.log(branch_cr, branch_address, branch_zone, branch_subzone);
        actions.add_branch(
          branch_cr,
          branch_address,
          branch_zone,
          branch_subzone
        );
      });

      Swal.fire({
        icon: "success",
        title: "Archivo procesado correctamente",
        text: "Los activos han sido agregados.",
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
        data-bs-target="#createBranchModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createBranchModal"
        tabIndex="-1"
        aria-labelledby="createBranchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createProviderModal">
                Crear Sucursal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Input para cargar archivo Excel */}
            <div className="modal-body">
              <h5>Cargar Archivo Excel</h5>
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <input
                    className="form-control"
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <button
                    onClick={handleFileUpload}
                    className="btn btn-primary w-100 mt-2 mt-sm-0"
                  >
                    Cargar Archivo Excel
                  </button>
                </div>
              </div>
              <h5>Formulario de Agregar Sucursal</h5>
              <FormBranches btnBranch={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
