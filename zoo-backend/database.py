# ======================= IMPORTAÇÕES ==========================================
from sqlmodel import create_engine, Session

# ======================= CONFIGURAÇÃO DO BANCO =================================
"""
DATABASE_URL indica qual banco e onde será salvo.
Neste caso estamos usando SQLite, um banco leve ideal para testes.
O arquivo será criado localmente com o nome 'zoo.db'.
"""
DATABASE_URL = "sqlite:///./zoo.db"

"""
echo=True exibe no terminal as consultas SQL executadas,
ótimo para depuração (em produção normalmente deixamos False).
"""
engine = create_engine(DATABASE_URL, echo=True)

# ======================= CONEXÃO E SESSÃO =====================================
"""
get_session() cria uma sessão com o banco de dados.
Utilizamos yield, pois o FastAPI gerencia automaticamente a abertura e fechamento da sessão.
Assim conseguimos usar essa função como um Dependência (Dependable).
"""
def get_session():
    with Session(engine) as session:
        yield session
