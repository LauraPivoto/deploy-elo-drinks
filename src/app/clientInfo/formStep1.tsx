import React from 'react';
import '../globals.css';

interface FormStepProps {
  formData: { nome: string; email: string; telefone: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showErrors?: boolean;
}

const FormStep1 = ({ formData, handleChange, showErrors }: FormStepProps) => (
  <>
    <div className="inputGroup">
      <label className="label">Nome:</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        className="input"
        required
      />
      {showErrors && !formData.nome && (
        <span className="error">O nome é obrigatório.</span>
      )}
    </div>
    <div className="inputGroup">
      <label className="label">E-mail:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="input"
        required
      />
      {showErrors && !formData.email && (
        <span className="error">O e-mail é obrigatório.</span>
      )}
    </div>
    <div className="inputGroup">
      <label className="label">Telefone:</label>
      <input
        type="tel"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        className="input"
        required
      />
      {showErrors && !formData.telefone && (
        <span className="error">O telefone é obrigatório.</span>
      )}
    </div>
  </>
);

export default FormStep1;
