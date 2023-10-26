import json

class LoadDataFactory:
    # instance = None
    # __new__
    # __init__
    @staticmethod
    def getJson(fileName):
        with open(fileName, "r") as file:
            return json.load(file)