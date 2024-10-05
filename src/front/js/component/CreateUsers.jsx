import React from "react";
import { FormUsers } from "./FormUsers.jsx";

export const CreateUsers = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createUserModal"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div
        class="modal fade"
        id="createUserModal"
        tabindex="-1"
        aria-labelledby="createUserModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createProviderModal">
                Crear Usuario Nuevo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <FormUsers btnUser={"Crear"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
