from flask import Flask, jsonify, request
from flask_cors import CORS
from padroes.LoadDataSingleton import LoadDataSingleton
from padroes.QuestaoFactory import QuestaoFactory
from padroes.ModoJogoStrategy import TemaDificuldade, TemaEAleatorio, DificuldadeEAleatorio, Aleatorio, Context
from padroes.GameSingleton import Game

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

jogo_atual = None
questao_atual = None

## colocar quantidade de questoes

@app.route('/iniciar', methods=['POST'])
def iniciar_jogo():
    global jogo_atual
    context = Context()
    dataSingleton = LoadDataSingleton()
    data = dataSingleton.get_json("data.json")
    nome = request.json.get("nome")
    modo_jogo_str = request.json.get("modo_jogo")
    questoes = request.json.get("questoes")
    # data = LoadDataFactory.getJson("data.json") # singleton

    if not jogo_atual:
        jogo_atual = Game(nome, modo_jogo_str)
        jogo_atual.nome = nome
        jogo_atual.modo_jogo = modo_jogo_str

        
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

        questoes_geradas = context.gerar_questoes(strategy, data, questoes)
        jogo_atual.set_questoes(questoes_geradas)

        response = {"status": "Jogo iniciado", "nome": nome, "modo_jogo": modo_jogo_str}
        return jsonify(response)
    else:
        return jsonify({"status": "Um jogo já está em andamento"}), 409

@app.route('/obter_questao', methods=['GET'])
def obter_questao():
    global jogo_atual, questao_atual

    if not jogo_atual:
        return jsonify({"status": "Jogo não iniciado"}), 400

    total_perguntas = len(jogo_atual.questoes)
    perguntas_respondidas = len(jogo_atual.questoes_respondidas)
    pergunta_numero = perguntas_respondidas + 1

    for data in jogo_atual.questoes:
        if data["id"] not in jogo_atual.questoes_respondidas:
            questao_atual = QuestaoFactory.criar_questao(data)
            resposta = {
                "pergunta_atual": f"{pergunta_numero}/{total_perguntas}",
                "questao": data
            }
            return jsonify(resposta)

    return jsonify({"status": "Todas as questões foram respondidas"}), 204


@app.route('/verificar_resposta', methods=['POST'])
def verificar_resposta():
    global jogo_atual, questao_atual

    if not jogo_atual or not questao_atual:
        return jsonify({"status": "Jogo não iniciado ou questão não foi buscada"}), 404

    resposta = request.json.get("resposta")

    if jogo_atual.questao_foi_respondida(questao_atual.id):
        return jsonify({"status": "Questão já foi respondida anteriormente"}), 400

    alternativa_correta = next((alt for alt in questao_atual.alternativas if alt.correta), None)

    if alternativa_correta and alternativa_correta.alternativa == resposta:
        jogo_atual.questoes_corretas += 1
        jogo_atual.set_pontuacao(jogo_atual.pontuacao + questao_atual.dificuldade)
        jogo_atual.adicionar_questao_respondida(questao_atual.id)
        return jsonify({"resultado": "Certa Resposta", "pontuacao": jogo_atual.pontuacao})

    jogo_atual.adicionar_questao_respondida(questao_atual.id)
    return jsonify({"resultado": "Resposta Errada", "pontuacao": jogo_atual.pontuacao})


@app.route('/finalizar', methods=['GET'])
def finalizar_jogo():
    global jogo_atual, questao_atual

    if not jogo_atual:
        return jsonify({"status": "Jogo não iniciado"}), 400

    resultado = {
        "nome": jogo_atual.nome,
        "pontuacao": str(jogo_atual.pontuacao),
        "questoes_corretas": str(jogo_atual.questoes_corretas) + "/" + str(len(jogo_atual.questoes_respondidas)),
        "nome": jogo_atual.nome,
        "tema-dificuldade": jogo_atual.modo_jogo
    }       


    jogo_atual.finalizar_jogo()
    jogo_atual = None
    questao_atual = None

    return jsonify(resultado), 200

if __name__ == '__main__':
    app.run(debug=True)