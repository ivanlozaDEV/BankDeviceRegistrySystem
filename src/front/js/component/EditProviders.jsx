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
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-provider-${provider.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id={`edit-provider-${provider.id}`}
        tabIndex="-1"
        aria-labelledby={`edit-provider-${provider.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`edit-provider-${provider.id}`}>
                Editar Proveedor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormProviders
                btnProvider={"Actualizar"}
                provider={provider}
                id={provider.id}
              />
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
