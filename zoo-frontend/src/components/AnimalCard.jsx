// ======================= IMPORTAÇÕES ===============================
import React, { useState } from "react";
import api from "../services/api"; // 🌐 Conexão com o backend

/**
 * Componente responsável por exibir e permitir a edição de um animal individual.
 * Inclui funcionalidades de:
 * - Visualização dos dados
 * - Edição do nome
 * - Exclusão do animal
 */
function AnimalCard({
  id,
  nome,
  especie,
  data_nascimento,
  descricao,
  habitat,
  pais_origem,
  atualizarLista, // 🔄 Função para recarregar os dados no componente pai
}) {

  // ======================= ESTADOS ===============================
  const [editando, setEditando] = useState(false);   // Controla modo edição
  const [novoNome, setNovoNome] = useState(nome);    // Nome atualizado

  // ======================= FUNÇÕES ===============================

  /**
   * Calcula a idade do animal com base na data de nascimento.
   * Retorna "N/A" caso o dado seja inválido.
   */
  function calcularIdade(data) {
    if (!data) return "N/A";

    const nascimento = new Date(`${data}T00:00:00`);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajuste caso ainda não tenha passado o mês/dia do aniversário
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  /**
   * Exclui o animal do banco de dados após confirmação do usuário.
   */
  function excluirAnimal() {
    if (!window.confirm(`Tem certeza que deseja excluir ${nome}?`)) return;

    api
      .delete(`/animais/${id}`)
      .then(() => {
        alert("Animal excluído com sucesso!");
        atualizarLista(); // 🔄 Atualiza listagem
      })
      .catch((error) => {
        console.error("Erro ao excluir:", error);
        alert("❌ Erro ao excluir o animal.");
      });
  }

  /**
   * Salva a edição de dados do animal (por enquanto apenas o nome).
   * Envia *todos* os dados ao backend, pois APIs geralmente exigem objeto completo.
   */
  function salvarEdicao() {
    api
      .put(`/animais/${id}`, {
        nome: novoNome,
        descricao,
        data_nascimento,
        especie,
        habitat,
        pais_origem,
      })
      .then(() => {
        alert("Animal atualizado com sucesso!");
        setEditando(false);
        atualizarLista();
      })
      .catch((error) => {
        console.error("Erro ao atualizar:", error);
        alert("❌ Erro ao atualizar o animal.");
      });
  }

  // ======================= JSX ===============================
  return (
    <div style={styles.card}>

      {/* Nome exibido ou editado */}
      {editando ? (
        <input
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          style={styles.input}
        />
      ) : (
        <h3>{nome}</h3>
      )}

      {/* Informações do animal */}
      <p><strong>Espécie:</strong> {especie}</p>
      <p><strong>Descrição:</strong> {descricao}</p>
      <p><strong>Habitat:</strong> {habitat}</p>
      <p><strong>Origem:</strong> {pais_origem}</p>
      <p><strong>Idade:</strong> {calcularIdade(data_nascimento)} anos</p>

      {/* Botões de ação */}
      {editando ? (
        <button style={styles.btnSalvar} onClick={salvarEdicao}>
          💾 Salvar
        </button>
      ) : (
        <button style={styles.btnEditar} onClick={() => setEditando(true)}>
          ✏️ Editar
        </button>
      )}

      <button style={styles.btnExcluir} onClick={excluirAnimal}>
        🗑️ Excluir
      </button>
    </div>
  );
}

// ======================= ESTILOS INLINE ===============================
// ⚠️ Pode ser migrado para CSS futuramente para melhor manutenção.
const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    margin: "10px 0",
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    padding: "5px",
  },
  btnEditar: {
    marginRight: "5px",
    backgroundColor: "#ffc107",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  btnSalvar: {
    marginRight: "5px",
    backgroundColor: "#28a745",
    border: "none",
    padding: "5px 10px",
    color: "#fff",
    cursor: "pointer",
  },
  btnExcluir: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "5px 10px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default AnimalCard;
