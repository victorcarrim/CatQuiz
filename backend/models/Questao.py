from typing import List, Dict

from .Alternativa import Alternativa

class Questao:
    def __init__(self, id: int, questao: str, alternativas: List[Dict[str, bool]], dificuldade: int, tema: str):
        self.id = id
        self.questao = questao
        self.alternativas = [Alternativa(a['alternativa'], a['correta']) for a in alternativas]
        self.dificuldade = dificuldade
        self.tema = tema