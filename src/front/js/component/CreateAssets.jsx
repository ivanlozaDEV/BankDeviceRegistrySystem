import React from "react";
import { FormAssets } from "./FormAssets.jsx";

export const CreateAssets = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createAssetModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        class="modal fade"
        id="createAssetModal"
        tabindex="-1"
        aria-labelledby="createAssetModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createAssetModal">
                Crear Activo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormAssets btnAsset={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
