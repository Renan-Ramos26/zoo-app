import CuidadoForm from "../components/CuidadoForm";
import CuidadoList from "../components/CuidadoList";
import { useState } from "react";

/**
 * Página responsável pelo gerenciamento de cuidados dos animais.
 *
 * Aqui o usuário pode:
 * - Cadastrar novos cuidados (alimentação, vacinação, exames, etc.)
 * - Visualizar todos os cuidados cadastrados
 *
 * O estado `atualizar` é utilizado como gatilho para forçar
 * a recarga da lista de cuidados após um cadastro ou edição.
 */
export default function CuidadosPage() {
  // Estado que serve como trigger para atualizar a listagem de cuidados
  const [atualizar, setAtualizar] = useState(false);

  /**
   * Alterna o estado `atualizar`, notificando o componente de lista
   * para buscar novamente os dados na API.
   */
  function atualizarLista() {
    setAtualizar((prev) => !prev);
  }

  return (
    <div>
      <h2>💉 Gerenciar Cuidados</h2>

      {/*
        Formulário responsável por cadastrar ou atualizar cuidados.
        Recebe a função `atualizarLista` para solicitar a recarga da lista.
      */}
      <CuidadoForm atualizarLista={atualizarLista} />

      {/*
        Lista de cuidados cadastrados.
        O prop `atualizar` funciona como um sinal para atualizar a listagem.
      */}
      <CuidadoList atualizar={atualizar} />
    </div>
  );
}
