import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateBranches } from "../component/CreateBranches.jsx";
import { EditBranches } from "../component/EditBranches.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const Branches = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [branchesPerPage] = useState(4); // Número de activos por página

  useTokenExpiration();

  // Filtrar activos según los filtros aplicados (actualmente no hay filtros)
  const filteredBranches = store.branchs; // Manteniendo todos los activos sin filtrar
  console.log(filteredBranches);

  // Calcular los índices para la paginación
  const indexOfLastBranch = currentPage * branchesPerPage; // Último activo en la página actual
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage; // Primer activo en la página actual
  const currentBranches = filteredBranches.slice(
    indexOfFirstBranch,
    indexOfLastBranch
  ); // Activos mostrados en la página actual

  const totalPages = Math.ceil(filteredBranches.length / branchesPerPage); // Total de páginas
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Función para cambiar de página

  // Función para manejar la paginación hacia adelante
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para manejar la paginación hacia atrás
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
      return;
    }
    getTokenInfo();
  }, []);

  const deleteBranch = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Sucursal?",
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
        actions.deleteBranch(id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sucursal eliminada correctamente",
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
        <CreateBranches />
      </div>
      {currentBranches.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>CR</th>
              <th>Dirección</th>
              <th>Zona</th>
              <th>Subzona</th>
            </tr>
          </thead>
          <tbody>
            {currentBranches.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.id}</td>
                <td>{branch.branch_cr}</td>
                <td>{branch.branch_address}</td>
                <td>{branch.branch_zone}</td>
                <td>{branch.branch_subzone}</td>

                <td colSpan={2}>
                  <button
                    type="button"
                    className="btn me-5"
                    onClick={() => deleteBranch(branch.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <EditBranches branch={branch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay sucursales disponibles.</p>
      )}

      {/* Controles de paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {/* Botón de página anterior */}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &laquo; {/* Flecha izquierda */}
            </button>
          </li>
          {/* Botones para cada número de página */}
          {[...Array(totalPages)].map((_, index) => (
            <li className="page-item" key={index}>
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
          {/* Botón de página siguiente */}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &raquo; {/* Flecha derecha */}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
