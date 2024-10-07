import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { FormUserMb } from "./FormUserMb.jsx";
import * as XLSX from "xlsx";

export const CreateUsersMb = () => {
  const { actions } = useContext(Context);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const [header, ...rows] = jsonData;
      const expectedColumns = [
        "Usuario MB",
        "Activo",
        "Nombres",
        "Apellidos",
        "Número de Empleado",
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

      const promises = rows.map((row) => {
        const [user_name_MB, is_active, names, last_names, employee_number] =
          row;
        return actions.add_userMB(
          user_name_MB,
          is_active,
          names,
          last_names,
          employee_number
        );
      });

      Promise.all(promises)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Archivo procesado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema procesando algunos usuarios: ${error.message}`,
          });
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
        data-bs-target="#createUserMBModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createUserMBModal"
        tabIndex="-1"
        aria-labelledby="createUserMBModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createUserMBModal">
                Crear Usuario MB
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h5>Formulario de Agregar Usuario MB</h5>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <button
                onClick={handleFileUpload}
                className="btn btn-success mt-2"
              >
                Cargar archivo
              </button>
              <FormUserMb btnMB={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
