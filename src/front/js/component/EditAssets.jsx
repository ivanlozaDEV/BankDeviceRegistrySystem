import React from "react";
import { FormAssets } from "./FormAssets.jsx";

export const EditAssets = ({ asset }) => {
  if (!asset) {
    return <p>No se encontro el activo</p>;
  }
  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-asset-${asset.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id={`edit-asset-${asset.id}`}
        tabIndex="-1"
        aria-labelledby={`edit-asset-${asset.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`edit-asset-${asset.id}`}>
                Editar Activo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAssets btnAsset={"Actualizar"} asset={asset} id={asset.id} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
