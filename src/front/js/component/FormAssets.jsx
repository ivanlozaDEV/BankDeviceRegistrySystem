import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const FormAssets = ({ id, btnAsset, asset: initialAsset }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [asset, setAsset] = useState({
    asset_type: "",
    asset_brand: "",
    asset_model: "",
    asset_serial: "",
    asset_inventory_number: "",
    provider_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza el Activo"
        : "espere mientras se crea el Activo",
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
        ? await actions.editAsset(
            id,
            asset.asset_type,
            asset.asset_brand,
            asset.asset_model,
            asset.asset_serial,
            asset.asset_inventory_number,
            asset.provider_id
          )
        : await actions.add_asset(
            asset.asset_type,
            asset.asset_brand,
            asset.asset_model,
            asset.asset_serial,
            asset.asset_inventory_number,
            asset.provider_id
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id ? "Activo Actualizado" : "Activo creado correctamente",
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
        setAsset({
          asset_type: "",
          asset_brand: "",
          asset_model: "",
          asset_serial: "",
          asset_inventory_number: "",
          provider_id: "",
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
    actions.getAssets();
    if (initialAsset) {
      setAsset({
        asset_type: initialAsset.asset_type || "",
        asset_brand: initialAsset.asset_brand || "",
        asset_model: initialAsset.asset_model || "",
        asset_serial: initialAsset.asset_serial || "",
        asset_inventory_number: initialAsset.asset_inventory_number || "",
        provider_id: initialAsset.provider_id,
      });
    }
  }, []);
  return (
    <>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="inputTipo" class="form-label">
            Tipo de Activo
          </label>
          <input
            type="text"
            class="form-control"
            id="inputTipo"
            value={asset.asset_type}
            name="asset_type"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputMarca" class="form-label">
            Marca
          </label>
          <input
            type="text"
            class="form-control"
            id="inputMarca"
            value={asset.asset_brand}
            name="asset_brand"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-6">
          <label for="inputModelo" class="form-label">
            Modelo
          </label>
          <input
            type="text"
            class="form-control"
            id="inputModelo"
            value={asset.asset_model}
            name="asset_model"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputSerie" class="form-label">
            N° Serie
          </label>
          <input
            type="text"
            class="form-control"
            id="inputSerie"
            value={asset.asset_serial}
            name="asset_serial"
            onChange={handleChange}
          />
        </div>
        <div class="col-6">
          <label for="inputActivo" class="form-label">
            N° Activo
          </label>
          <input
            type="text"
            class="form-control"
            id="inputActivo"
            value={asset.asset_inventory_number}
            name="asset_inventory_number"
            onChange={handleChange}
          />
        </div>
        <select
          className="form-select"
          name="provider_id"
          aria-label="Default select example"
          value={asset.provider_id}
          onChange={handleChange}
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
        <hr />
        <div className="d-flex justify-content-end">
          <button type="submit" className="form-members-submit btn btn-primary">
            {btnAsset}
          </button>
        </div>
      </form>
    </>
  );
};
