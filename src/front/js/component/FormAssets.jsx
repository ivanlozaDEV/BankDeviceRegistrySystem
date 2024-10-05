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
    setLoading(true);

    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Espere mientras se actualiza el Activo"
        : "Espere mientras se crea el Activo",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
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
      }).then(() => {
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
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema: ${error.message}`,
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
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="inputTipo" className="form-label">
          Tipo de Activo
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTipo"
          value={asset.asset_type}
          name="asset_type"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputMarca" className="form-label">
          Marca
        </label>
        <input
          type="text"
          className="form-control"
          id="inputMarca"
          value={asset.asset_brand}
          name="asset_brand"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputModelo" className="form-label">
          Modelo
        </label>
        <input
          type="text"
          className="form-control"
          id="inputModelo"
          value={asset.asset_model}
          name="asset_model"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputSerie" className="form-label">
          N° Serie
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSerie"
          value={asset.asset_serial}
          name="asset_serial"
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputActivo" className="form-label">
          N° Activo
        </label>
        <input
          type="text"
          className="form-control"
          id="inputActivo"
          value={asset.asset_inventory_number}
          name="asset_inventory_number"
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
          value={asset.provider_id}
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

      <div className="col-12">
        <hr />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            {btnAsset}
          </button>
        </div>
      </div>
    </form>
  );
};
