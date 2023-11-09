import random

class ModoJogo():
    def gerar_questoes(self, data, max_questoes):
        pass

class TemaDificuldade(ModoJogo):
    def __init__(self, tema, dificuldade):
        self.tema = tema
        self.dificuldade = dificuldade

    def gerar_questoes(self, data, max_questoes):
        questoes_filtradas = [q for q in data["questoes"] if q['tema'] == self.tema and q['dificuldade'] == self.dificuldade]
        random.shuffle(questoes_filtradas)
        return questoes_filtradas[:max_questoes]

class TemaEAleatorio(ModoJogo):
    def __init__(self, tema):
        self.tema = tema

    def gerar_questoes(self, data, max_questoes):
        questoes_selecionadas = []
        dificuldades = [10, 30, 50]
        for dificuldade in dificuldades:
            questoes_filtradas = [q for q in data["questoes"] if q['tema'] == self.tema and q['dificuldade'] == dificuldade]
            random.shuffle(questoes_filtradas)
            questoes_selecionadas.extend(questoes_filtradas)

        return questoes_selecionadas[:max_questoes]

class DificuldadeEAleatorio(ModoJogo):
    def __init__(self, dificuldade):
        self.dificuldade = dificuldade

    def gerar_questoes(self, data, max_questoes):
        temas = data["temas"]
        random.shuffle(temas)
        
        questoes_selecionadas = []
        for tema in temas:
            questoes_filtradas = [q for q in data["questoes"] if q['tema'] == tema and q['dificuldade'] == self.dificuldade]
            random.shuffle(questoes_filtradas)
            questoes_selecionadas.extend(questoes_filtradas)

        return questoes_selecionadas[:max_questoes]

class Aleatorio(ModoJogo):
    def gerar_questoes(self, data, max_questoes):
        todas_questoes = data["questoes"].copy()  # Cria uma cópia das questões para não modificar a lista original
        random.shuffle(todas_questoes)
        return todas_questoes[:max_questoes]

class Context:
    def gerar_questoes(self, strategy, data, max_questoes):
        return strategy.gerar_questoes(data, max_questoes)

# Exemplo de uso:
# context = Context()
# strategy = TemaDificuldade("git", 50)  # Não mais passa max_questoes aqui
# questoes = context.gerar_questoes(strategy, data, 10)  # 
