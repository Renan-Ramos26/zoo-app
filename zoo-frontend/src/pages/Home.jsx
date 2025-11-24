import { Link } from "react-router-dom";
import "../styles/home.css";

/**
 * Página inicial do sistema do Zoológico.
 *
 * Esta tela funciona como um menu principal, oferecendo acesso rápido
 * às áreas de gerenciamento de Animais e Cuidados. 
 *
 * Não possui estados internos e serve apenas como navegação.
 */
export default function Home() {
  return (
    <div className="container home-box">
      {/* Título principal da aplicação */}
      <h1 className="home-title">🐼 Jardim Zoológico</h1>

      {/* Subtítulo descritivo da página inicial */}
      <p className="home-subtitle">
        Bem-vindo ao sistema do Zoo! Escolha uma opção abaixo:
      </p>

      {/* Área contendo os botões de navegação */}
      <div className="home-links">
        
        {/* Link para a página de gerenciamento de animais */}
        <Link className="btn-primary" to="/animais">
          🐾 Gerenciar Animais
        </Link>

        {/* Link para a página de gerenciamento de cuidados */}
        <Link className="btn-primary" to="/cuidados">
          💉 Gerenciar Cuidados
        </Link>
      </div>
    </div>
  );
}
