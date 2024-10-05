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
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-branch-${branch.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id={`edit-branch-${branch.id}`}
        tabIndex="-1"
        aria-labelledby={`edit-branch-${branch.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`edit-branch-${branch.id}`}>
                Editar Sucursal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormBranches
                btnBranch={"Actualizar"}
                branch={branch}
                id={branch.id}
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
