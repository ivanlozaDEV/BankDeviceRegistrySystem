import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateAssets } from "../component/CreateAssets.jsx";
import { EditAssets } from "../component/EditAssets.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const Assets = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [assetsPerPage] = useState(4); // Número de activos por página

  useTokenExpiration();

  // Filtrar activos según los filtros aplicados (actualmente no hay filtros)
  const filteredAssets = store.assets; // Manteniendo todos los activos sin filtrar

  // Calcular los índices para la paginación
  const indexOfLastAsset = currentPage * assetsPerPage; // Último activo en la página actual
  const indexOfFirstAsset = indexOfLastAsset - assetsPerPage; // Primer activo en la página actual
  const currentAssets = filteredAssets.slice(
    indexOfFirstAsset,
    indexOfLastAsset
  ); // Activos mostrados en la página actual

  const totalPages = Math.ceil(filteredAssets.length / assetsPerPage); // Total de páginas
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

  const deleteAsset = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Activo?",
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
        actions.deleteAsset(id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Activo eliminado correctamente",
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
        <CreateAssets />
      </div>

      {currentAssets.length > 0 ? (
        <div className="row overflow-auto">
          <table className="table table-striped table-hover table-bordered table-responsive text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>N.° Serie</th>
                <th>N.° Activo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((asset, index) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.asset_type}</td>
                  <td>{asset.asset_brand}</td>
                  <td>{asset.asset_model}</td>
                  <td>{asset.asset_serial}</td>
                  <td>{asset.asset_inventory_number}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <EditAssets asset={asset} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay activos disponibles.</p>
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
