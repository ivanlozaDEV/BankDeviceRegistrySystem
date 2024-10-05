import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { FormAssets } from "./FormAssets.jsx";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Importamos la librería xlsx para leer el archivo Excel

export const CreateAssets = () => {
  const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [provider_id, SetProviderId] = useState("");
  const { store, actions } = useContext(Context);
  // Función para manejar la carga de archivos Excel
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Función para procesar el archivo Excel y agregar los datos
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
      const expectedColumns = ["Tipo", "Marca", "Modelo", "Serie", "Activo"];

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
        const [
          asset_type,
          asset_brand,
          asset_model,
          asset_serial,
          asset_inventory_number,
        ] = row;
        console.log(
          asset_type,
          asset_brand,
          asset_model,
          asset_serial,
          asset_inventory_number,
          provider_id
        );

        actions.add_asset(
          asset_type,
          asset_brand,
          asset_model,
          asset_serial,
          asset_inventory_number,
          provider_id
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
        data-bs-target="#createAssetModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createAssetModal"
        tabIndex="-1"
        aria-labelledby="createAssetModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createAssetModal">
                Crear Activo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Input para cargar archivo Excel */}
            <div className="mb-3 p-3">
              <h5>Cargar Archivo Excel</h5>
              <div className="d-flex justify-content-between">
                <input
                  className="col-6"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
                <div className="col-6">
                  <select
                    className="form-select"
                    name="provider_id"
                    aria-label="Default select example"
                    value={provider_id}
                    onChange={(e) => SetProviderId(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un provedor</option>
                    {store.providers.map((provider) => {
                      return (
                        <option key={provider.id} value={provider.id}>
                          {provider.company_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button
                onClick={handleFileUpload}
                className="btn btn-primary mt-2"
              >
                Cargar Archivo Excel
              </button>
            </div>
            <div className="modal-body">
              <h5>Formulario de Agregar Activo</h5>
              <FormAssets btnAsset={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
