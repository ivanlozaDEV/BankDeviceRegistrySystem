import React from "react";
import { FormProviders } from "./FormProviders.jsx";

export const CreateProviders = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createProviderModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        class="modal fade"
        id="createProviderModal"
        tabindex="-1"
        aria-labelledby="createProviderModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createProviderModal">
                Crear Proveedor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormProviders btnProvider={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
