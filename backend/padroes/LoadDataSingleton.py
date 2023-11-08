import json
from typing import Any

class LoadDataSingleton:
    _instance = None
    _data = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LoadDataSingleton, cls).__new__(cls)
        return cls._instance

    def get_json(self, file_name: str) -> Any:
        # Se o arquivo já foi carregado, retorne os dados armazenados
        if file_name in self._data:
            return self._data[file_name]

        # Caso contrário, carregue o arquivo e armazene os dados
        with open(file_name, "r") as file:
            self._data[file_name] = json.load(file)
            return self._data[file_name]

