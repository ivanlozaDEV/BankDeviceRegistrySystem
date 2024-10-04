import React, { useState } from "react";

export const FilterAssets = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({ type: "", brand: "" }); // Restablece los filtros
    onApplyFilters({ type: "", brand: "" }); // Asegúrate de aplicar filtros vacíos para mostrar todos
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary me-2"
        data-bs-toggle="modal"
        data-bs-target="#filterAssetsModal"
      >
        Filtrar Activos
      </button>

      <div
        className="modal fade"
        id="filterAssetsModal"
        tabIndex="-1"
        aria-labelledby="filterAssetsModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filtrar Activos</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="form-select mb-2"
              >
                <option value="">Selecciona un tipo</option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
              </select>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="form-select mb-2"
              >
                <option value="">Selecciona una marca</option>
                <option value="marca1">Marca 1</option>
                <option value="marca2">Marca 2</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Aplicar Filtros
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClearFilters}
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
