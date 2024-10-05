import React from "react";
import { FormProviders } from "./FormProviders.jsx";

export const CreateProviders = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createProviderModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createProviderModal"
        tabIndex="-1"
        aria-labelledby="createProviderModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createProviderModal">
                Crear Proveedor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormProviders btnProvider={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
