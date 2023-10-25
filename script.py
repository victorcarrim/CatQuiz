import json

# Carregar o arquivo JSON com encoding UTF-8
with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Adicionar um campo de ID incremental
for index, item in enumerate(data, 1):
    item["id"] = index

# Salvar o arquivo JSON modificado com encoding UTF-8
with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Campo de ID adicionado com sucesso!")
