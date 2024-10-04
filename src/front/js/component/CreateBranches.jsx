import React from "react";
import { FormBranches } from "./FormBranches.jsx";

export const CreateBranches = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createBranchModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        class="modal fade"
        id="createBranchModal"
        tabindex="-1"
        aria-labelledby="createBranchModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createProviderModal">
                Crear Sucursal
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormBranches btnBranch={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
