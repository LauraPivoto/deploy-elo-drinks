"use client";
import React from "react";
import "../globals.css";

interface InfoFestaProps {
  formData: {
    numConvidados: string;
    tipoEvento: string;
    localizacao: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  showErrors?: boolean;
}

const FormStep2: React.FC<InfoFestaProps> = ({
  formData,
  handleChange,
  handleSubmit,
  showErrors,
}) => {
  return (
    <div>
      <div className="inputGroup">
        <label htmlFor="numConvidados" className="label">
          Número de convidados:
        </label>
        <input
          type="text"
          id="numConvidados"
          name="numConvidados"
          value={formData.numConvidados}
          onChange={handleChange}
          className="input"
          required
        />
        {showErrors && !formData.numConvidados && (
          <span className="error">O número de convidados é obrigatório.</span>
        )}
      </div>
      <div className="inputGroup">
        <label htmlFor="tipoEvento" className="label">
          Tipo de evento:
        </label>
        <input
          type="text"
          id="tipoEvento"
          name="tipoEvento"
          value={formData.tipoEvento}
          onChange={handleChange}
          className="input"
          required
        />
        {showErrors && !formData.tipoEvento && (
          <span className="error">O tipo de evento é obrigatório.</span>
        )}
      </div>
      <div className="inputGroup">
        <label htmlFor="localizacao" className="label">
          Localização:
        </label>
        <input
          type="text"
          id="localizacao"
          name="localizacao"
          value={formData.localizacao}
          onChange={handleChange}
          className="input"
          required
        />
        {showErrors && !formData.localizacao && (
          <span className="error">A localização é obrigatória.</span>
        )}
      </div>
    </div>
  );
};

export default FormStep2;