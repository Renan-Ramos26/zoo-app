// ======================= IMPORTAÇÕES ====================================
import React, { useEffect, useState } from "react";
import api from "../services/api"; // 🔄 serviço padronizado de API
import AnimalCard from "./AnimalCard";

/**
 * Componente que lista todos os animais cadastrados.
 * Recebe a prop:
 * - atualizar: booleano que dispara a atualização da lista (quando um animal é cadastrado ou editado)
 */
function AnimalList({ atualizar }) {
  // Estado que guarda os animais retornados pela API
  const [animais, setAnimais] = useState([]);
  const [erro, setErro] = useState("");       // Mensagem de erro
  const [loading, setLoading] = useState(true); // Loading state

  // ======================= FUNÇÃO DE BUSCA ===============================
  /**
   * Busca todos os animais cadastrados no backend
   */
  async function buscarAnimais() {
    setLoading(true);
    setErro("");
    try {
      const res = await api.get("/animais");
      setAnimais(res.data);
    } catch (err) {
      console.error("⚠️ Erro ao buscar animais:", err);
      setErro("⚠️ Não foi possível carregar a lista de animais.");
      setAnimais([]);
    } finally {
      setLoading(false);
    }
  }

  // ======================= USE EFFECT ====================================
  // Executa a busca ao carregar a página e sempre que 'atualizar' mudar
  useEffect(() => {
    buscarAnimais();
  }, [atualizar]);

  // ======================= JSX ===========================================
  return (
    <div>
      <h2>🐾 Animais Cadastrados:</h2>

      {/* Mensagem de loading */}
      {loading && <p>Carregando animais...</p>}

      {/* Mensagem de erro */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* Caso não existam animais */}
      {!loading && animais.length === 0 && !erro && (
        <p>⚠️ Nenhum animal cadastrado.</p>
      )}

      {/* Lista de cards */}
      {animais.map((animal) => (
        <AnimalCard
          key={animal.id}
          id={animal.id}
          nome={animal.nome}
          especie={animal.especie}
          data_nascimento={animal.data_nascimento}
          descricao={animal.descricao}
          habitat={animal.habitat}
          pais_origem={animal.pais_origem}
          atualizarLista={buscarAnimais} // 🔄 permite atualização após editar/excluir
        />
      ))}
    </div>
  );
}

export default AnimalList;
