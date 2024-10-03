import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateAssets } from "../component/CreateAssets.jsx";
import { EditAssets } from "../component/EditAssets.jsx";

export const Assets = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const deleteAsset = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Activo?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
      customClass: {
        container: "custom-container",
      },
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteAsset(id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Activo eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "custom-container",
          },
        });
      } else {
        return;
      }
    });
  };
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <CreateAssets />
      </div>
      {store.assets.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>N° Serie</th>
              <th>N° Activo</th>
            </tr>
          </thead>
          <tbody>
            {store.assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.asset_type}</td>
                <td>{asset.asset_brand}</td>
                <td>{asset.asset_model}</td>
                <td>{asset.asset_serial}</td>
                <td>{asset.asset_inventory_number}</td>
                <td colSpan={2}>
                  <button
                    type="button"
                    className="btn me-5"
                    onClick={(e) => deleteAsset(member.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <EditAssets asset={asset} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay activos disponibles.</p>
      )}
    </div>
  );
};
