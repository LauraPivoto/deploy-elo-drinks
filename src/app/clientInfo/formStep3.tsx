'use client';
import React from "react";
import "../globals.css"; // Import global CSS

interface InfoBarProps {
  formData: {
    numConvidados: string;
    tipoEvento: string;
    localizacao: string;
    tipoBar: string;
    numBarmans: string;
    extras: string[];
    observacoes: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleExtrasChange: (extra: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormStep3: React.FC<InfoBarProps & { showErrors?: boolean }> = ({
  formData,
  handleChange,
  handleExtrasChange,
  handleSubmit,
  showErrors,
}) => {
  const [currentPlan, setCurrentPlan] = React.useState(0); // Selected plan
  const plans = [
    { name: "Basic: Bebidas refrescantes com opções alcoólicas simples e populares.", description: "Coca-Cola, Guaraná, Sprite, Água mineral com e sem gás, suco natural: Laranja ou Maracujá, Cerveja Pilsen (long neck ou latão): Skol, Brahma ou Itaipava, Ice alcoólica (Smirnoff Ice ou similar), Chopp claro (opcional)" },
    { name: "Premium: Mais variedade e sofisticação, com drinks leves e cervejas especiais.", description: "Além do plano Basic: suco natural (2 sabores): Abacaxi com hortelã, Morango, Água aromatizada com frutas, Cervejas artesanais ou especiais: Heineken, Eisenbahn, Stella Artois, Vinho (branco e tinto seco ou suave), Espumante brut ou moscatel, Drinks prontos: Caipirinha tradicional ou de frutas, Gin tônica simples, Chá gelado com vodka (opcional)" },
    { name: "Deluxe: Um bar completo com mixologia, ideal para eventos sofisticados.", description: "Tudo do Premium, mais: Gin tônica com especiarias, Moscow Mule,Mojito,Piña Colada,Aperol Spritz,Coquetéis personalizados com nome do evento, Whisky (Red Label, Black Label ou equivalente), Tequila com limão e sal,Espumante Rosé ou Champagne (sob demanda), Caipirinhas variadas com vodka, saquê ou cachaça premium" },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="label">Escolha seu Plano:</h2>
        <div className="planContainer">
          <button
            type="button"
            onClick={() => setCurrentPlan((prev) => (prev === 0 ? plans.length - 1 : prev - 1))}
            className="planButton"
          >
            <img src="/leftButton.png" alt="Left Button" />
            <span className="buttonText"></span>
          </button>
          <div className="planDetails">
            <h2>{plans[currentPlan].name}</h2>
            <p>{plans[currentPlan].description}</p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPlan((prev) => (prev === plans.length - 1 ? 0 : prev + 1))}
            className="rotate90"
          >
            <img src="/leftButton.png" alt="Left Button" />
          </button>
        </div>

        <div className="inputGroup">
          <label htmlFor="numBarmans" className="label">
            Número de Barmans:
          </label>
          <input
            type="number"
            id="numBarmans"
            name="numBarmans"
            value={formData.numBarmans}
            onChange={handleChange}
            className="input"
            required
          />
          {showErrors && !formData.numBarmans && (
            <span className="error">O número de barmans é obrigatório.</span>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="tipoBar" className="label">Plano:</label>
          <select
            id="tipoBar"
            name="tipoBar"
            value={formData.tipoBar}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Selecione</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Deluxe">Deluxe</option>
          </select>
          {showErrors && !formData.tipoBar && (
            <span className="error">O plano é obrigatório.</span>
          )}
        </div>

        <h3 className="label">Extras:</h3>
        <div className="extrasSection">
          <div>
            <h4 className="h4">Alcoólicas:</h4>
            <div className="extrasList">
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Shots de tequila ou cachaça"
                  checked={formData.extras.includes("Shots de tequila ou cachaça")}
                  onChange={() => handleExtrasChange("Shots de tequila ou cachaça")}
                  className="checkbox"
                />
                Shots de tequila ou cachaça
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Sangria artesanal"
                  checked={formData.extras.includes("Sangria artesanal")}
                  onChange={() => handleExtrasChange("Sangria artesanal")}
                  className="checkbox"
                />
                Sangria artesanal
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Clericot com frutas da estação"
                  checked={formData.extras.includes("Clericot com frutas da estação")}
                  onChange={() => handleExtrasChange("Clericot com frutas da estação")}
                  className="checkbox"
                />
                Clericot com frutas da estação
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Licor (Amarula, Baileys)"
                  checked={formData.extras.includes("Licor (Amarula, Baileys)")}
                  onChange={() => handleExtrasChange("Licor (Amarula, Baileys)")}
                  className="checkbox"
                />
                Licor (Amarula, Baileys)
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Gin nacional ou importado"
                  checked={formData.extras.includes("Gin nacional ou importado")}
                  onChange={() => handleExtrasChange("Gin nacional ou importado")}
                  className="checkbox"
                />
                Gin nacional ou importado
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Cervejas importadas (Corona, Paulaner, Leffe)"
                  checked={formData.extras.includes("Cervejas importadas (Corona, Paulaner, Leffe)")}
                  onChange={() => handleExtrasChange("Cervejas importadas (Corona, Paulaner, Leffe)")}
                  className="checkbox"
                />
                Cervejas importadas (Corona, Paulaner, Leffe)
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Vinho quente (para festas juninas)"
                  checked={formData.extras.includes("Vinho quente (para festas juninas)")}
                  onChange={() => handleExtrasChange("Vinho quente (para festas juninas)")}
                  className="checkbox"
                />
                Vinho quente (para festas juninas)
              </div>
            </div>
          </div>
          <div>
            <h4 className="h4">Não alcoólicas:</h4>
            <div className="extrasList">
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Energéticos (Red Bull, Monster)"
                  checked={formData.extras.includes("Energéticos (Red Bull, Monster)")}
                  onChange={() => handleExtrasChange("Energéticos (Red Bull, Monster)")}
                  className="checkbox"
                />
                Energéticos (Red Bull, Monster)
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Água de coco"
                  checked={formData.extras.includes("Água de coco")}
                  onChange={() => handleExtrasChange("Água de coco")}
                  className="checkbox"
                />
                Água de coco
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Frappés com ou sem café"
                  checked={formData.extras.includes("Frappés com ou sem café")}
                  onChange={() => handleExtrasChange("Frappés com ou sem café")}
                  className="checkbox"
                />
                Frappés com ou sem café
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Milkshakes alcoólicos (com Amarula, Baileys, etc.)"
                  checked={formData.extras.includes("Milkshakes alcoólicos (com Amarula, Baileys, etc.)")}
                  onChange={() => handleExtrasChange("Milkshakes alcoólicos (com Amarula, Baileys, etc.)")}
                  className="checkbox"
                />
                Milkshakes alcoólicos (com Amarula, Baileys, etc.)
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Suco detox"
                  checked={formData.extras.includes("Suco detox")}
                  onChange={() => handleExtrasChange("Suco detox")}
                  className="checkbox"
                />
                Suco detox
              </div>
              <div className="h4">
                <input
                  type="checkbox"
                  name="extras"
                  value="Café expresso ou cappuccino"
                  checked={formData.extras.includes("Café expresso ou cappuccino")}
                  onChange={() => handleExtrasChange("Café expresso ou cappuccino")}
                  className="checkbox"
                />
                Café expresso ou cappuccino
              </div>
            </div>
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="observacoes" className="label">Observações:</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            className="input"
            rows={3}
            placeholder="Alguma observação extra?"
          />
          {/* Se quiser tornar observações obrigatório, descomente abaixo */}
          {/* {showErrors && !formData.observacoes && (
            <span className="error">A observação é obrigatória.</span>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default FormStep3;