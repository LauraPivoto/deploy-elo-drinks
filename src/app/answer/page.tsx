"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { sendBudgetEmail, updateBudgetStatus } from "../../../services/budgetService";

export default function ResponderOrcamento() {
  const [aceito, setAceito] = useState<boolean | undefined>(undefined);
  const [valorPorPessoa, setValorPorPessoa] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const budgetId = searchParams.get("_id");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!budgetId) {
      setErro("ID do orçamento não encontrado.");
      return;
    }

    setLoading(true);
    try {
      await updateBudgetStatus({
        _id: budgetId,
        new_status: aceito ? "Aprovado" : "Recusado",
        value: Number(valorPorPessoa),
      });
      if (aceito) {
        await sendBudgetEmail(budgetId);
      }
      alert("Resposta enviada com sucesso!");
      router.push("/admin");
    } catch (error) {
      setErro("Erro ao enviar resposta. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf2e1] py-16 px-4">
      <h1 className="h1 !text-center !ml-0">Responder Orçamento</h1>
      <form className="space-y-10 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium mb-1">
                Orçamento aceito?
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={aceito === undefined ? "" : aceito ? "sim" : "nao"}
                onChange={e =>
                  setAceito(
                    e.target.value === "sim"
                      ? true
                      : e.target.value === "nao"
                        ? false
                        : undefined
                  )
                }
                required
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">
                Valor do orçamento completo (R$)
              </label>
              <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded-lg px-3 py-2"
              value={valorPorPessoa}
              onChange={e => {
                const value = e.target.value;
                // Aceita apenas números positivos ou vazio
                if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
                setValorPorPessoa(value);
                }
              }}
              placeholder="Ex: 50.00"
              required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Observações</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Adicione observações relevantes..."
                rows={3}
              />
            </div>
            {erro && <div className="text-red-600">{erro}</div>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#007366] text-white py-2 px-6 rounded-xl text-base font-medium hover:bg-[#00584e] transition mt-4"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Resposta"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}