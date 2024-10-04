import React from "react";
import { FormBranches } from "./FormBranches.jsx";

export const EditBranches = ({ branch }) => {
  if (!branch) {
    return <p>No se encontro la sucursal</p>;
  }
  return (
    <>
      <button
        type="button"
        class="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-branch-${branch.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        class="modal fade"
        id={`edit-branch-${branch.id}`}
        tabindex="-1"
        aria-labelledby={`edit-branch-${branch.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`edit-branch-${branch.id}`}>
                Editar Sucursal
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormBranches
                btnBranch={"Actualizar"}
                branch={branch}
                id={branch.id}
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
