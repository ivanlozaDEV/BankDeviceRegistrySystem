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
        class="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-user-${user.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        class="modal fade"
        id={`edit-user-${user.id}`}
        tabindex="-1"
        aria-labelledby={`edit-user-${user.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`edit-user-${user.id}`}>
                Editar Usuario
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormUsers btnUser={"Actualizar"} user={user} id={user.id} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
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
