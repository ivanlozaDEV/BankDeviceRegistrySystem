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
        class="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-asset-${asset.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        class="modal fade"
        id={`edit-asset-${asset.id}`}
        tabindex="-1"
        aria-labelledby={`edit-asset-${asset.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`edit-asset-${asset.id}`}>
                Editar Activo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormAssets btnAsset={"Actualizar"} asset={asset} id={asset.id} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
