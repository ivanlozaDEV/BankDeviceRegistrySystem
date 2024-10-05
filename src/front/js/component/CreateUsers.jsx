import React from "react";
import { FormUsers } from "./FormUsers.jsx";

export const CreateUsers = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createUserModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createProviderModal">
                Crear Usuario Nuevo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormUsers btnUser={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
