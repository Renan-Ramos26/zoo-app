from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database import get_session
from models import Cuidado, Animal
from schemas import CuidadoCreate

router = APIRouter(tags=["Cuidados"])


# Listar todos os cuidados
@router.get("/", response_model=list[Cuidado])
def listar_cuidados(session: Session = Depends(get_session)):
    return session.exec(select(Cuidado)).all()

# Buscar cuidado por ID
@router.get("/{cuidado_id}", response_model=Cuidado)
def buscar_cuidado(cuidado_id: int, session: Session = Depends(get_session)):
    cuidado = session.get(Cuidado, cuidado_id)
    if not cuidado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cuidado não encontrado")
    return cuidado

# Criar cuidado
@router.post("/", response_model=Cuidado, status_code=status.HTTP_201_CREATED)
def criar_cuidado(dados: CuidadoCreate, session: Session = Depends(get_session)):
    if not session.get(Animal, dados.animal_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Animal não existe")
    novo = Cuidado(**dados.dict())
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

# Atualizar cuidado
@router.put("/{cuidado_id}", response_model=Cuidado)
def atualizar_cuidado(cuidado_id: int, dados: CuidadoCreate, session: Session = Depends(get_session)):
    cuidado = session.get(Cuidado, cuidado_id)
    if not cuidado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cuidado não encontrado")
    if not session.get(Animal, dados.animal_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Animal não existe")
    for campo, valor in dados.dict().items():
        setattr(cuidado, campo, valor)
    session.commit()
    session.refresh(cuidado)
    return cuidado

# Deletar cuidado
@router.delete("/{cuidado_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_cuidado(cuidado_id: int, session: Session = Depends(get_session)):
    cuidado = session.get(Cuidado, cuidado_id)
    if not cuidado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cuidado não encontrado")
    session.delete(cuidado)
    session.commit()
    return {"detail": "Cuidado deletado com sucesso"}
