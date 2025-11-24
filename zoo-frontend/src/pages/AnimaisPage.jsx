import AnimalForm from "../components/AnimalForm";
import AnimalList from "../components/AnimalList";
import { useState } from "react";

/**
 * Página responsável por gerenciar o cadastro e listagem de animais.
 */
export default function AnimaisPage() {
  // Estado utilizado como gatilho para recarregar a listagem de animais
  const [atualizar, setAtualizar] = useState(false);

  /**
   * Alterna o estado `atualizar`, enviando um sinal para `AnimalList`
   * recarregar os dados a partir da API.
   */
  function atualizarLista() {
    setAtualizar((prev) => !prev);
  }

  return (
    <div>
      <h2>🐾 Gerenciar Animais</h2>

      {/* Componente de formulário recebe prop `atualizarLista` */}
      <AnimalForm atualizarLista={atualizarLista} />

      {/* Lista de animais cadastrados */}
      <AnimalList atualizar={atualizar} />
    </div>
  );
}
