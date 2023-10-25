from typing import Dict
from models.Questao import Questao

class QuestaoFactory:
    @staticmethod
    def criar_questao(data: Dict):
        return Questao(
            id=data["id"],
            questao=data["questão"],
            alternativas=data["alternativas"],
            dificuldade=data["dificuldade"],
            tema=data["tema"]
        )