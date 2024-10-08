import React from "react";
import { FormMigrations } from "./FormMigrations.jsx";

export const EditMigrations = ({ migration }) => {
  if (!migration) {
    return <p>No se encontro la migración</p>;
  }
  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#edit-migration-${migration.id}`}
      >
        <i className="fa-solid fa-pencil"></i>
      </button>

      <div
        className="modal fade"
        id={`edit-migration-${migration.id}`}
        tabIndex="-1"
        aria-labelledby={`edit-migration-${migration.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`edit-migration-${migration.id}`}>
                Editar Migración
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormMigrations
                id={migration.id}
                btnMigration={"Actualizar"}
                migration={migration}
                key={migration.id}
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
