'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css"; // Import global CSS

const InfoBar = () => {
  const [formData, setFormData] = useState({
    numConvidados: "",
    tipoEvento: "",
    localizacao: "",
  });

  const [currentStep] = useState(3); // Current step for the progress bar
  const [currentPlan, setCurrentPlan] = useState(0); // Selected plan
  const plans = [
    { name: "Basic", description: "Bebidas Alcoólicas: Capira, Vodka, Tang, Leite com Manga", price: "R$ 50" },
    { name: "Premium", description: "Bebidas Alcoólicas: Gin, Vodka, Whisky, Leite com Manga", price: "R$ 100" },
    { name: "Deluxe", description: "Bebidas Alcoólicas: Gin, Vodka, Whisky, Champagne", price: "R$ 150" },
  ];

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/nextPage"); // Redirect to the next page
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <h1 className="h1">Informações do Bar</h1>
        <p className="h2">Complete as informações sobre o Bar para prosseguir:</p>
      </div>

      <div className="formContainer">
  {/* Progress Bar */}
  <div className="progressBar">
    <div className={`progressStep ${currentStep === 1 ? "activeStep" : ""}`}>
      <div className={`stepCircle ${currentStep === 1 ? "activeCircle" : ""}`}></div>
      Suas informações
    </div>
    <div className={`progressStep ${currentStep === 2 ? "activeStep" : ""}`}>
      <div className={`stepCircle ${currentStep === 2 ? "activeCircle" : ""}`}></div>
      Informações da festa
    </div>
    <div className={`progressStep ${currentStep === 3 ? "activeStep" : ""}`}>
      <div className={`stepCircle ${currentStep === 3 ? "activeCircle" : ""}`}></div>
      Informações do Bar
    </div>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit}>
    {/* Plan Selection */}
    <h3 className="planTitle">Escolha seu Plano:</h3>
    <div className="planContainer">
      <button
        type="button"
        onClick={() => setCurrentPlan((prev) => (prev === 0 ? plans.length - 1 : prev - 1))}
        className="planButton"
      >
        &#8592;
      </button>
      <div className="planDetails">
        <h3 className="planName">&lt; {plans[currentPlan].name} &gt;</h3>
        <p className="planDescription">{plans[currentPlan].description}</p>
        <p className="planPrice">{plans[currentPlan].price}</p>
      </div>
      <button
        type="button"
        onClick={() => setCurrentPlan((prev) => (prev === plans.length - 1 ? 0 : prev + 1))}
        className="planButton"
      >
        &#8594;
      </button>
    </div>

    {/* Number of Bartenders */}
    <div className="inputGroup">
      <label htmlFor="numConvidados" className="label">
        Número de Barmans:
      </label>
      <input
        type="number"
        id="numConvidados"
        name="numConvidados"
        value={formData.numConvidados}
        onChange={handleChange}
        className="input"
        required
      />
    </div>

    {/* Extras */}
    <div className="extrasContainer">
      <h3 className="extrasTitle">Extras:</h3>
      <div className="extrasList">
        <label className="extrasItem">
          <input type="checkbox" name="extras" value="Moscow Mule" className="checkbox" />
          Moscow Mule - <span className="extrasPrice">R$ 20</span>
        </label>
        <label className="extrasItem">
          <input type="checkbox" name="extras" value="Ginger Beer" className="checkbox" />
          Ginger Beer - <span className="extrasPrice">R$ 15</span>
        </label>
        <label className="extrasItem">
          <input type="checkbox" name="extras" value="Gin Tônica" className="checkbox" />
          Gin Tônica - <span className="extrasPrice">R$ 30</span>
        </label>
      </div>
    </div>

    <button type="submit" className="button">
      Próximo
    </button>
  </form>
</div>
  </div>
  );
}
export default InfoBar;