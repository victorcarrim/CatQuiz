import random

class ModoJogo():
    def gerar_questoes(self, questoes):
        pass

class TemaDificuldade(ModoJogo):
    def __init__(self, tema, dificuldade):
        self.tema = tema
        self.dificuldade = dificuldade

    def gerar_questoes(self, data):
        questoes_filtradas = [q for q in data["questoes"] if q['tema'] == self.tema and q['dificuldade'] == self.dificuldade]
        random.shuffle(questoes_filtradas)
        return questoes_filtradas[:10]

class TemaEAleatorio(ModoJogo):
    def __init__(self, tema):
        self.tema = tema

    def gerar_questoes(self, data):
        questoes_selecionadas = []
        for dificuldade, quantidade in [(10, 3), (30, 3), (50, 4)]:
            questoes_filtradas = [q for q in data["questoes"] if q['tema'] == self.tema and q['dificuldade'] == dificuldade]
            random.shuffle(questoes_filtradas)
            questoes_selecionadas.extend(questoes_filtradas[:quantidade])
        return questoes_selecionadas

class DificuldadeEAleatorio(ModoJogo):
    def __init__(self, dificuldade):
        self.dificuldade = dificuldade

    def gerar_questoes(self, data):
        temas = data["temas"]
        random.shuffle(temas)
        
        # Dá a um tema uma quantidade extra de questões
        questoes_por_tema = {tema: 2 for tema in temas}
        questoes_por_tema[temas[0]] = 4

        questoes_selecionadas = []

        for tema, quantidade in questoes_por_tema.items():
            questoes_filtradas = [q for q in data["questoes"] if q['tema'] == tema and q['dificuldade'] == self.dificuldade]
            random.shuffle(questoes_filtradas)
            questoes_selecionadas.extend(questoes_filtradas[:quantidade])

        return questoes_selecionadas

class Aleatorio(ModoJogo):
    def __init__(self):
        pass

    def gerar_questoes(self, data):
        temas = data["temas"]
        dificuldades = [10, 30, 50]
        
        questoes_selecionadas = []
        todas_questoes = data["questoes"].copy()  # Cria uma cópia das questões para não modificar a lista original
        
        while len(questoes_selecionadas) < 10 and todas_questoes:
            tema_aleatorio = random.choice(temas)
            dificuldade_aleatoria = random.choice(dificuldades)
            
            questoes_filtradas = [q for q in todas_questoes if q['tema'] == tema_aleatorio and q['dificuldade'] == dificuldade_aleatoria]
            
            if questoes_filtradas:
                questao_aleatoria = random.choice(questoes_filtradas)
                questoes_selecionadas.append(questao_aleatoria)
                todas_questoes.remove(questao_aleatoria)  # Remove a questão selecionada da lista principal para evitar duplicatas
                
        return questoes_selecionadas[:10]


class Context:
    def gerar_questoes(self, strategy, data):
        return strategy.gerar_questoes(data)
