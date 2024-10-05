import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateUsers } from "../component/CreateUsers.jsx";
import { EditUsers } from "../component/EditUsers.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const Users = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [usersPerPage] = useState(10); // Número de activos por página

  useTokenExpiration();

  // Filtrar activos según los filtros aplicados (actualmente no hay filtros)
  const filteredUsers = store.users || []; // Manteniendo todos los activos sin filtrar

  // Calcular los índices para la paginación
  const indexOfLastUser = currentPage * usersPerPage; // Último activo en la página actual
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // Primer activo en la página actual
  const currentUsers = Array.isArray(filteredUsers)
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : []; // Activos mostrados en la página actual

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Total de páginas
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <CreateUsers />
      </div>
      {currentUsers.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Usuario</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Número de Empleado</th>
              <th>Subzona</th>
              <th>Rol</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id + index}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.names}</td>
                <td>{user.last_names}</td>
                <td>{user.employee_number}</td>
                <td>{user.subzone}</td>
                <td>{user.role}</td>
                <td>{user.is_active ? "Sí" : "No"}</td>
                <td colSpan={2}>
                  <EditUsers user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios disponibles.</p>
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
