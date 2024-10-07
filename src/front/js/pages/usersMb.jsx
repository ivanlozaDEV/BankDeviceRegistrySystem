import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { CreateUsersMb } from "../component/CreateUsersMb.jsx";
import { EditUsersMb } from "../component/EditUsersMb.jsx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

export const UsersMb = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [usersMBPerPage] = useState(4); // Número de usuarios MB por página

  useTokenExpiration();

  // Filtrar usuarios MB según los filtros aplicados (actualmente no hay filtros)
  const filteredUsersMB = store.usersMB; // Manteniendo todos los usuarios MB sin filtrar

  // Calcular los índices para la paginación
  const indexOfLastUserMB = currentPage * usersMBPerPage; // Último usuario MB en la página actual
  const indexOfFirstUserMB = indexOfLastUserMB - usersMBPerPage; // Primer usuario MB en la página actual
  const currentUsersMB = filteredUsersMB.slice(
    indexOfFirstUserMB,
    indexOfLastUserMB
  ); // Usuarios MB mostrados en la página actual

  const totalPages = Math.ceil(filteredUsersMB.length / usersMBPerPage); // Total de páginas
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

  const deleteUserMB = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Usuario MB?",
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
        actions.deleteUserMB(id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario MB eliminado correctamente",
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
        <CreateUsersMb />
      </div>

      {currentUsersMB.length > 0 ? (
        <div className="row overflow-auto">
          <table className="table table-striped table-hover table-bordered table-responsive text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario MB</th>
                <th>Activo</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Número de Empleado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUsersMB.map((userMB, index) => (
                <tr key={userMB.id}>
                  <td>{userMB.id}</td>
                  <td>{userMB.user_name_MB}</td>
                  <td>{userMB.is_active}</td>
                  <td>{userMB.names}</td>
                  <td>{userMB.last_names}</td>
                  <td>{userMB.employee_number}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteUserMB(userMB.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <EditUsersMb user={userMB} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay usuarios MB disponibles.</p>
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
