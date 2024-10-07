import React from "react";
import { FormUserMb } from "./FormUserMb.jsx";

export const EditUsersMb = ({ user }) => {
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
                Editar Usuario MB
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormUserMb id={user.id} btnMB={"Actualizar"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
