import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/card.css";

/**
 * Componente que lista todos os cuidados cadastrados.
 * Props:
 * - atualizar: booleano que dispara atualização da lista (quando um cuidado é cadastrado ou editado)
 */
function CuidadoList({ atualizar }) {
  const [cuidados, setCuidados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [erro, setErro] = useState("");          // Mensagem de erro

  // ======================= FUNÇÃO DE BUSCA ===============================
  async function carregar() {
    setLoading(true);
    setErro("");
    try {
      const res = await api.get("/cuidados");
      setCuidados(res.data);
    } catch (err) {
      console.error("Erro ao carregar cuidados:", err);
      setErro("❌ Não foi possível carregar os cuidados.");
      setCuidados([]);
    } finally {
      setLoading(false);
    }
  }

  // ======================= USE EFFECT ===================================
  // Carrega a lista quando o componente é montado
  useEffect(() => {
    carregar();
  }, []);

  // Atualiza a lista quando o pai sinaliza alteração
  useEffect(() => {
    carregar();
  }, [atualizar]);

  // ======================= FUNÇÃO DE EXCLUSÃO ===========================
  async function excluirCuidado(id) {
    if (!window.confirm("Deseja realmente excluir este cuidado?")) return;

    try {
      await api.delete(`/cuidados/${id}`);
      alert("🗑️ Cuidado removido com sucesso!");
      carregar(); // Atualiza a lista após exclusão
    } catch (err) {
      console.error("Erro ao excluir cuidado:", err);
      alert("❌ Erro ao excluir cuidado!");
    }
  }

  // ======================= JSX ===========================================
  return (
    <div className="card">
      <h3 className="card-title">💉 Cuidados Registrados</h3>

      {loading && <p>Carregando cuidados...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!loading && cuidados.length === 0 && !erro && <p>Nenhum cuidado registrado.</p>}

      {cuidados.map((c) => (
        <div key={c.id} className="card-item">
          <p>
            <strong>{c.nome}</strong> - {c.descricao}{" "}
            <strong>({c.data})</strong>
          </p>
          <button className="btn-delete" onClick={() => excluirCuidado(c.id)}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default CuidadoList;
