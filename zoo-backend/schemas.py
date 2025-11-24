# ========================= IMPORTAÇÕES =========================================
from sqlmodel import SQLModel
from datetime import date

# ======================== SCHEMA DE ANIMAL ====================================
"""
Schema usado para criação/atualização de animais via API.
Obs.: Não tem o campo id, pois ele é criado automaticamente.
"""
class AnimalCreate(SQLModel):
    nome: str
    descricao: str
    data_nascimento: date
    especie: str
    habitat: str
    pais_origem: str

# ======================== SCHEMA DE CUIDADO ===================================
"""
Schema usado para criação/atualização de cuidados via API.
Agora inclui o campo obrigatórios `frequencia`.
"""
class CuidadoCreate(SQLModel):
    nome: str
    descricao: str
    data: date
    frequencia: str          # NOVO ❗ ex.: diário, semanal...
    animal_id: int           # Código do animal que recebe o cuidado
