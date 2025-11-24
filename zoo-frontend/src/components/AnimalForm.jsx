// ======================= IMPORTAÇÕES ===============================
import React, { useState } from "react";
import api from "../services/api"; // 🌐 Serviço de conexão com o backend
import "../styles/form.css";
import "../styles/card.css";

/**
 * Componente de formulário para cadastrar um novo animal.
 * 
 * Props:
 * - atualizarLista: função passada pelo pai para atualizar a lista após cadastro
 */
function AnimalForm({ atualizarLista }) {

  // ======================= ESTADO DO FORMULÁRIO ======================
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    data_nascimento: "",
    especie: "",
    habitat: "",
    pais_origem: "",
  });

  const [loading, setLoading] = useState(false); // ⚡ Estado de carregamento
  const [erro, setErro] = useState("");          // ⚠ Mensagem de erro

  /**
   * Atualiza os campos do formulário dinamicamente
   */
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  /**
   * Envia os dados para o backend
   */
  async function handleSubmit(e) {
    e.preventDefault(); // 🚫 evita refresh da página
    setLoading(true);
    setErro("");

    try {
      await api.post("/animais", formData);

      alert("🐾 Animal cadastrado com sucesso!");

      // Atualiza a lista no componente pai
      if (atualizarLista) atualizarLista();

      // Reseta o formulário
      setFormData({
        nome: "",
        descricao: "",
        data_nascimento: "",
        especie: "",
        habitat: "",
        pais_origem: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar animal:", err);
      setErro("⚠️ Não foi possível cadastrar o animal. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // ======================= JSX ===============================
  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>🐾 Cadastrar Animal</h3>

      {erro && <p className="form-error">{erro}</p>} {/* Mensagem de erro */}

      <input
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        className="form-input"
        required
      />

      <input
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="form-input"
        required
      />

      <input
        type="date"
        name="data_nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
        className="form-input"
        required
      />

      <input
        name="especie"
        placeholder="Espécie"
        value={formData.especie}
        onChange={handleChange}
        className="form-input"
        required
      />

      <input
        name="habitat"
        placeholder="Habitat"
        value={formData.habitat}
        onChange={handleChange}
        className="form-input"
        required
      />

      <input
        name="pais_origem"
        placeholder="País de origem"
        value={formData.pais_origem}
        onChange={handleChange}
        className="form-input"
        required
      />

      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}

export default AnimalForm;
