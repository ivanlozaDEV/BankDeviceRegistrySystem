import React from "react";
import { FormProviders } from "./FormProviders.jsx";

export const EditProviders = ({ provider }) => {
  if (!provider) {
    return <p>No se encontro el proveedor</p>;
  }
  return (
    <>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-provider-${provider.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        class="modal fade"
        id={`edit-provider-${provider.id}`}
        tabindex="-1"
        aria-labelledby={`edit-provider-${provider.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`edit-provider-${provider.id}`}>
                Editar Proveedor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormProviders
                btnProvider={"Actualizar"}
                provider={provider}
                id={provider.id}
              />
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
