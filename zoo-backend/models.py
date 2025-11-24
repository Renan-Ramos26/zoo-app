# ========================= IMPORTAÇÕES =========================================
from sqlmodel import SQLModel, Field, Relationship
from datetime import date
from typing import Optional, List

# ========================= MODELO: ANIMAL ======================================
"""
Representa um animal do zoológico.
Cada animal pode possuir vários cuidados registrados.
table=True indica que essa classe representará uma tabela no banco.
"""
class Animal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  # Chave primária

    nome: str
    descricao: str
    data_nascimento: date
    especie: str
    habitat: str
    pais_origem: str

    # Relação 1-N (um animal pode ter vários cuidados)
    cuidados: List["Cuidado"] = Relationship(back_populates="animal")


# ======================== MODELO: CUIDADO ======================================
"""
Representa uma ação de cuidado feita em um animal
(ex.: Alimentação, Vacinação, Exame veterinário).
Cada cuidado está vinculado a um único animal.
"""
class Cuidado(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    nome: str                     # Nome do cuidado
    descricao: str                # Detalhes sobre o cuidado aplicado
    data: date                    # Data em que ocorreu o cuidado
    frequencia: str               # Frequência (diária, semanal, mensal, etc.)  NOVO ❗

    # Foreign Key (ligação com o animal)
    animal_id: int = Field(foreign_key="animal.id")

    # Relação com a tabela Animal
    animal: Optional[Animal] = Relationship(back_populates="cuidados")
