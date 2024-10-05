import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateProviders } from "../component/CreateProviders.jsx";
import { EditProviders } from "../component/EditProviders.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const Providers = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [providersPerPage] = useState(4); // Número de activos por página

  useTokenExpiration();

  // Filtrar activos según los filtros aplicados (actualmente no hay filtros)
  const filteredProviders = store.providers; // Manteniendo todos los activos sin filtrar
  console.log(filteredProviders);

  // Calcular los índices para la paginación
  const indexOfLastProvider = currentPage * providersPerPage; // Último activo en la página actual
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage; // Primer activo en la página actual
  const currentProviders = filteredProviders.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  ); // Activos mostrados en la página actual

  const totalPages = Math.ceil(filteredProviders.length / providersPerPage); // Total de páginas
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

  const deleteProvider = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Proveedor?",
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
        actions.deleteProvider(id).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Proveedor eliminado correctamente",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "custom-container",
            },
          });
        });
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <CreateProviders />
      </div>
      {currentProviders.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Branch</th>
              <th>Nombre</th>
              <th>RFC</th>
              <th>Servicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProviders.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.id}</td>
                <td>{provider.branch_id}</td>
                <td>{provider.company_name}</td>
                <td>{provider.rfc}</td>
                <td>{provider.service}</td>
                <td>
                  <button
                    type="button"
                    className="btn me-5"
                    onClick={() => deleteProvider(provider.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <EditProviders provider={provider} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay proveedores disponibles.</p>
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
