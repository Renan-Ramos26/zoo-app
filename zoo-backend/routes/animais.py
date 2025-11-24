from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database import get_session
from models import Animal
from schemas import AnimalCreate

router = APIRouter(tags=["Animais"])

# Listar todos os animais
@router.get("/", response_model=list[Animal])
def listar_animais(session: Session = Depends(get_session)):
    return session.exec(select(Animal)).all()

# Buscar animal por ID
@router.get("/{animal_id}", response_model=Animal)
def buscar_animal(animal_id: int, session: Session = Depends(get_session)):
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Animal não encontrado")
    return animal

# Criar novo animal
@router.post("/", response_model=Animal, status_code=status.HTTP_201_CREATED)
def criar_animal(dados: AnimalCreate, session: Session = Depends(get_session)):
    novo = Animal(**dados.dict())
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

# Atualizar animal
@router.put("/{animal_id}", response_model=Animal)
def atualizar_animal(animal_id: int, dados: AnimalCreate, session: Session = Depends(get_session)):
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Animal não encontrado")
    for campo, valor in dados.dict().items():
        setattr(animal, campo, valor)
    session.commit()
    session.refresh(animal)
    return animal

# Deletar animal
@router.delete("/{animal_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_animal(animal_id: int, session: Session = Depends(get_session)):
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Animal não encontrado")
    session.delete(animal)
    session.commit()
    return {"detail": "Animal deletado com sucesso"}
