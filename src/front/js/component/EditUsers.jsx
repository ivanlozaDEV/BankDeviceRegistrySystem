import React from "react";
import { FormUsers } from "./FormUsers.jsx";

export const EditUsers = ({ user }) => {
  if (!user) {
    return <p>No se encontro el usuario</p>;
  }
  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-user-${user.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id={`edit-user-${user.id}`}
        tabIndex="-1"
        aria-labelledby={`edit-user-${user.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`edit-user-${user.id}`}>
                Editar Usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormUsers
                key={user.id}
                btnUser={"Actualizar"}
                user={user}
                id={user.id}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
