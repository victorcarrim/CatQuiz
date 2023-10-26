from flask import Flask, Response, jsonify, request
from flasgger import Swagger, swag_from
from flask_cors import CORS
from typing import List, Dict
import jsonpickle
from padroes.LoadDataFactory import LoadDataFactory
from padroes.QuestaoFactory import QuestaoFactory
from padroes.ModoJogoStrategy import TemaDificuldade, TemaEAleatorio, DificuldadeEAleatorio, Aleatorio, Context
from padroes.GameSingleton import Game

app = Flask(__name__)
swagger = Swagger(app)

CORS(app)

jogo_atual = None
questao_atual = None

@app.route('/iniciar', methods=['POST'])
@swag_from('docs/iniciar_jogo.yml')
def iniciar_jogo():
    global jogo_atual
    context = Context()
    nome = request.json.get("nome")
    modo_jogo_str = request.json.get("modo_jogo")
    # data
    arquivo = LoadDataFactory.getJson("data.json") # singleton

    if not jogo_atual:
        jogo_atual = Game(nome, modo_jogo_str)
        
        if "/" in modo_jogo_str:
            tema, valor_dificuldade = modo_jogo_str.split("/")
            valor_dificuldade = int(valor_dificuldade) if valor_dificuldade else None
            if tema and valor_dificuldade:
                strategy = TemaDificuldade(tema, valor_dificuldade)
            elif tema:
                strategy = TemaEAleatorio(tema)
            elif valor_dificuldade:
                strategy = DificuldadeEAleatorio(valor_dificuldade)
            else:
                strategy = Aleatorio()
        else:
            strategy = Aleatorio()

        questoes = context.gerar_questoes(strategy, arquivo)
        jogo_atual.set_questoes(questoes)

        response = {"status": "Jogo iniciado", "nome": nome, "modo_jogo": modo_jogo_str}
        return jsonify(response)
    else:
        return jsonify({"status": "Um jogo já está em andamento"}), 409

@app.route('/obter_questao', methods=['GET'])
@swag_from('docs/obter_questao.yml')
def obter_questao():
    global jogo_atual, questao_atual

    if not jogo_atual:
        return jsonify({"status": "Jogo não iniciado"}), 400

    for data in jogo_atual.questoes:
        if data["id"] not in jogo_atual.questoes_respondidas:
            questao_atual = QuestaoFactory.criar_questao(data)
            return jsonify(data)

    return jsonify({"status": "Todas as questões foram respondidas"}), 204

@app.route('/verificar_resposta', methods=['POST'])
@swag_from('docs/verificar_resposta.yml')
def verificar_resposta():
    global jogo_atual, questao_atual

    if not jogo_atual or not questao_atual:
        return jsonify({"status": "Jogo não iniciado ou questão não foi buscada"}), 404

    resposta = request.json.get("resposta")

    if jogo_atual.questao_foi_respondida(questao_atual.id):
        return jsonify({"status": "Questão já foi respondida anteriormente"}), 400

    alternativa_correta = next((alt for alt in questao_atual.alternativas if alt.correta), None)

    if alternativa_correta and alternativa_correta.alternativa == resposta:
        jogo_atual.set_pontuacao(jogo_atual.pontuacao + questao_atual.dificuldade)
        jogo_atual.adicionar_questao_respondida(questao_atual.id)
        return jsonify({"resultado": "Certa Resposta", "pontuacao": jogo_atual.pontuacao})

    jogo_atual.adicionar_questao_respondida(questao_atual.id)
    return jsonify({"resultado": "Resposta Errada", "pontuacao": jogo_atual.pontuacao})


@app.route('/finalizar', methods=['GET'])
@swag_from('docs/finalizar_jogo.yml') 
def finalizar_jogo():
    global jogo_atual, questao_atual

    if not jogo_atual:
        return jsonify({"status": "Jogo não iniciado"}), 400

    resultado = {
        "nome": jogo_atual.nome,
        "pontuacao": jogo_atual.pontuacao
    }

    jogo_atual.finalizar_jogo()
    jogo_atual = None
    questao_atual = None

    return jsonify(resultado), 200

if __name__ == '__main__':
    app.run(debug=True)