import json

class LoadDataFactory:
    @staticmethod
    def getJson(fileName):
        with open(fileName, "r") as file:
            return json.load(file)