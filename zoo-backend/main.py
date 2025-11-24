# ========================== IMPORTAÇÕES =======================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from database import engine  # Conexão com o banco
from routes.animais import router as animais_router  # Rotas de animais
from routes.cuidados import router as cuidados_router  # Rotas de cuidados

# ========================== CONFIGURAÇÃO DA API ===============================
app = FastAPI(
    title="API Zoológico 🐾",
    description="Sistema de gerenciamento de Animais e Cuidados de um Zoológico",
    version="1.0.0"
)

# ========================== CONFIGURAÇÃO DO CORS ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir qualquer origem
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================== STARTUP (CRIAR TABELAS) ==========================
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# ========================== ROTAS PRINCIPAIS ==================================
# Prefixos correspondem ao que o frontend espera
app.include_router(animais_router, prefix="/animais", tags=["Animais"])
app.include_router(cuidados_router, prefix="/cuidados", tags=["Cuidados"])

# ========================== ROTA INICIAL =====================================
@app.get("/")
def home():
    return {"mensagem": "API do Zoológico está funcionando! 🦁🐢🐘"}
