// ======================= IMPORTAÇÕES ====================================
// React é necessário para criar componentes funcionais
import React from "react";
// Importa o arquivo de estilos CSS específico do header
import "./Header.css";

function Header() {
  return (
    // ======================= JSX DO HEADER ===============================
    // <header> é uma tag semântica HTML que representa o topo da página
    <header className="topo">

      {/* Título do sistema com ícone ilustrativo */}
      <h2>🐾 Jardim Zoológico</h2>

      {/* Menu de navegação */}
      <nav>
        {/* Link para página inicial */}
        <a href="/">Home</a>
      </nav>
    </header>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default Header;
