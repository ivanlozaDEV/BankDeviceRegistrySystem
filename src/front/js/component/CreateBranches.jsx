import React from "react";
import { FormBranches } from "./FormBranches.jsx";

export const CreateBranches = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createBranchModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createBranchModal"
        tabIndex="-1"
        aria-labelledby="createBranchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createProviderModal">
                Crear Sucursal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormBranches btnBranch={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
