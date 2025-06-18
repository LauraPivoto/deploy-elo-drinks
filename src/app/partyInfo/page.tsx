'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

const InfoFesta = () => {
  const [formData, setFormData] = useState({
    numConvidados: "",
    tipoEvento: "",
    localizacao: "",
  });

  const [currentStep] = useState(2); 
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Send data to a server or another destination
    router.push("/infoBar"); // Redirect to the next page
  };

  return (
    <div>
      <div className="headerContainer">
        <h1 className="h1">Informações da Festa</h1>
        <p className="h2">
          Complete as informações sobre a festa para prosseguir:
        </p>
      </div>

      <div className="progressBar">
        <div className={`progressStep ${currentStep === 1 ? 'activeStep' : ''}`}>
          <div className={`stepCircle ${currentStep === 1 ? 'activeCircle' : ''}`}></div>
          Suas informações
        </div>
        <div className={`progressStep ${currentStep === 2 ? 'activeStep' : ''}`}>
          <div className={`stepCircle ${currentStep === 2 ? 'activeCircle' : ''}`}></div>
          Informações da festa
        </div>
        <div className={`progressStep ${currentStep === 3 ? 'activeStep' : ''}`}>
          <div className={`stepCircle ${currentStep === 3 ? 'activeCircle' : ''}`}></div>
          Informações do bar
        </div>
      </div>

      <div className="partyFormContainer">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="nome" className="label">
              Número de convidados:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.numConvidados}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">
              Tipo de evento::
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.tipoEvento}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="telefone" className="label">
              Localização:
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.localizacao}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <button type="submit" className="button">
            Próximo
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoFesta;