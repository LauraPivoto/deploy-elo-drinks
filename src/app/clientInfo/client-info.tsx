'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormStep1 from './formStep1';
import FormStep2 from './formStep2';
import FormStep3 from './formStep3';
import '../globals.css';
import { createBudget } from '../../../services/budgetService';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    numConvidados: '',
    tipoEvento: '',
    localizacao: '',
    tipoBar: '',
    numBarmans: '',
    extras: [] as string[],
    observacoes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExtrasChange = (extra: string) => {
    setFormData((prev) => {
      const extras = prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra];
      return { ...prev, extras };
    });
  };

  // Validação dos campos obrigatórios por etapa
  const validateStep = () => {
    if (currentStep === 1) {
      return formData.nome && formData.email && formData.telefone;
    }
    if (currentStep === 2) {
      return formData.numConvidados && formData.tipoEvento && formData.localizacao;
    }
    if (currentStep === 3) {
      return formData.numBarmans && formData.tipoBar;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Integração com a API
      try {
        await createBudget({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          budget: {
            description: formData.localizacao,
            type: formData.tipoEvento,
            date: "", // Adapte se tiver campo de data
            num_barmans: Number(formData.numBarmans),
            num_guests: Number(formData.numConvidados),
            time: 0, // Adapte se tiver campo de tempo
            package: formData.tipoBar,
            extras: formData.extras,
          },
          status: "Pendente",
          value: 0,
        });
        router.push('/finishMessage');
      } catch (err) {
        alert("Erro ao enviar orçamento. Tente novamente." + err);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setShowErrors(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar o formData para a API
    router.push('/partyInfo');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 formData={formData} handleChange={handleChange} showErrors={showErrors} />;
      case 2:
        return <FormStep2 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} showErrors={showErrors} />;
      case 3:
        return <FormStep3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleExtrasChange={handleExtrasChange} showErrors={showErrors} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="h1">Quer a Elo Drinks no seu evento?</h1>
      <h2 className="h2">Para isso, preencha os dados abaixo para podermos fazer um orçamento:</h2>

      <div className="progressBar">
        {[1, 2, 3].map((step) => (
          <div key={step} className={`progressStep ${currentStep === step ? 'activeStep' : ''}`}>
            <div className={`stepCircle ${currentStep === step ? 'activeCircle' : ''}`}></div>
            {step === 1 && 'Suas informações'}
            {step === 2 && 'Informações da festa'}
            {step === 3 && 'Informações do bar'}
          </div>
        ))}
      </div>

      <div className="formContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
          <div className="buttonGroup">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrev} className="formButton secondary">
                Voltar
              </button>
            )}
            <button type="button" onClick={handleNext} className="formButton">
              {currentStep === 3 ? 'Finalizar' : 'Próximo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
