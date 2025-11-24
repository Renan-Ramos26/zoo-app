// ======================= IMPORTAÇÕES ====================================
import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/card.css";
import "../styles/form.css";

/**
 * Componente de formulário para registrar cuidados de animais.
 *
 * Props:
 * - atualizarLista: função passada pelo pai para atualizar a lista de cuidados
 */
function CuidadoForm({ atualizarLista }) {
  // ======================= ESTADOS ======================================
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [animalId, setAnimalId] = useState("");

  const [animais, setAnimais] = useState([]); // Lista de animais para o <select>
  const [loading, setLoading] = useState(false); // Estado de envio do formulário
  const [erro, setErro] = useState(""); // Mensagem de erro

  // ======================= USE EFFECT ===================================
  // Carrega a lista de animais disponíveis ao montar o componente
  useEffect(() => {
    async function carregarAnimais() {
      try {
        const res = await api.get("/animais");
        setAnimais(res.data);
      } catch (err) {
        console.error("Erro ao carregar animais:", err);
        alert("❌ Erro ao carregar animais!");
      }
    }
    carregarAnimais();
  }, []);

  // ======================= FUNÇÃO SALVAR =================================
  /**
   * Envia os dados do formulário para a API
   */
  async function salvarCuidado(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await api.post("/cuidados", {
        nome,
        descricao,
        data,
        frequencia,
        animal_id: Number(animalId),
      });

      alert("🩺 Cuidado registrado com sucesso!");

      // Limpa os campos do formulário
      setNome("");
      setDescricao("");
      setData("");
      setFrequencia("");
      setAnimalId("");

      // Atualiza lista de cuidados na tela
      if (atualizarLista) atualizarLista();
    } catch (err) {
      console.error("Erro ao registrar cuidado:", err);
      setErro("❌ Não foi possível registrar o cuidado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // ======================= JSX ===========================================
  return (
    <form onSubmit={salvarCuidado} className="form-card">
      <h3>Registrar Cuidado 🩺</h3>

      {/* Mensagem de erro */}
      {erro && <p className="form-error">{erro}</p>}

      {/* Campo texto: Nome do cuidado */}
      <input
        type="text"
        placeholder="Nome do cuidado (Ex: Vacinação)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="form-input"
        required
      />

      {/* Campo texto: Descrição */}
      <textarea
        placeholder="Descrição do cuidado"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="form-input"
        required
      />

      {/* Data em que o cuidado foi realizado */}
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="form-input"
        required
      />

      {/* Frequência do cuidado */}
      <select
        value={frequencia}
        onChange={(e) => setFrequencia(e.target.value)}
        className="form-input"
        required
      >
        <option value="">Frequência</option>
        <option value="Diária">Diária</option>
        <option value="Semanal">Semanal</option>
        <option value="Mensal">Mensal</option>
        <option value="Anual">Anual</option>
      </select>

      {/* Seleciona o animal que recebeu o cuidado */}
      <select
        value={animalId}
        onChange={(e) => setAnimalId(e.target.value)}
        className="form-input"
        required
      >
        <option value="">Selecione um animal</option>
        {animais.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>

      {/* Botão de envio */}
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}

export default CuidadoForm;
