import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import { jwtDecode } from "jwt-decode";
import "../../styles/index.css";
import Swal from "sweetalert2";
import { CreateMigrations } from "../component/CreateMigrations.jsx";

export const Migrations = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [migrationsPerPage] = useState(4); // Número de migraciones por página

  useTokenExpiration();

  // Filtrar migraciones según los filtros aplicados (actualmente no hay filtros)
  const filteredMigrations = store.migrations; // Manteniendo todas las migraciones sin filtrar

  // Calcular los índices para la paginación
  const indexOfLastMigration = currentPage * migrationsPerPage; // Última migración en la página actual
  const indexOfFirstMigration = indexOfLastMigration - migrationsPerPage; // Primera migración en la página actual
  const currentMigrations = filteredMigrations.slice(
    indexOfFirstMigration,
    indexOfLastMigration
  ); // Migraciones mostradas en la página actual

  const totalPages = Math.ceil(filteredMigrations.length / migrationsPerPage); // Total de páginas
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Función para cambiar de página

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
    }
  }, []);

  const deleteMigration = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Migración?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      customClass: {
        container: "custom-container",
      },
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteMigration(id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Migración eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "custom-container",
          },
        });
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <CreateMigrations />
      </div>

      {currentMigrations.length > 0 ? (
        <div className="row overflow-auto">
          <table className="table table-striped table-hover table-bordered table-responsive text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Instalación</th>
                <th>Migración</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentMigrations.map((migration, index) => (
                <tr key={migration.id}>
                  <td>{migration.id}</td>
                  <td>{migration.installation_date}</td>
                  <td>{migration.migration_date}</td>
                  <td>{migration.migration_description}</td>
                  <td>{migration.migration_status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteMigration(migration.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <EditMigrations migration={migration} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay migraciones disponibles.</p>
      )}

      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="page-item">
              <button
                className={`page-link ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
