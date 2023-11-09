class Singleton(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Game(metaclass=Singleton):
    def __init__(self, nome, modo_jogo):
        self.nome = nome
        self.modo_jogo = modo_jogo
        self.pontuacao = 0
        self.questoes = []
        self.questoes_respondidas = []
        self.questoes_corretas = 0

    def set_questoes(self, questoes):
        self.questoes = questoes

    def set_pontuacao(self, pontuacao : int):
        self.pontuacao = pontuacao

    def adicionar_questao_respondida(self, questao_id: int):
        if questao_id not in self.questoes_respondidas:
            self.questoes_respondidas.append(questao_id)
            
    def questao_foi_respondida(self, questao_id: int) -> bool:
        return questao_id in self.questoes_respondidas
    
    def finalizar_jogo(self):
        self.nome = ""
        self.modo_jogo = None
        self.pontuacao = 0
        self.questoes = []
        self.questoes_respondidas = []
        self.questoes_corretas = 0