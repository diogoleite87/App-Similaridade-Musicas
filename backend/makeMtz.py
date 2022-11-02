import math
import pandas as pd


class MakeMtz:

    def __init__(self, num_vet=0, num_edg=0):
        self.mat_adj = []
        self.lista_adj = []
        self.list_posicao_semelhantes = []
        self.num_vet = num_vet
        self.num_edg = num_edg
        self.list_json = []

    def addEdge(self, u, v, result):
        if u < self.num_vet and v < self.num_vet:
            self.mat_adj[u][v] = result
            self.lista_adj[u].append(result)
        else:
            print("Aresta Invalida")

    def readFile(self, nameFile):

        try:
            fileCSV = pd.read_csv(nameFile, sep=';', encoding='utf-8')

            return fileCSV
        except:
            print("Erro ao ler arquivo CSV.")

    def firstStep(self, fileCSV):

        fileTXT = open('distanciasIparaJ.txt', 'w')

        self.num_vet = len(fileCSV)
        self.mat_adj = [[0 for _ in range(self.num_vet)]
                        for _ in range(self.num_vet)]
        self.lista_adj = [[] for i in range(self.num_vet)]

        for i in range(len(fileCSV)):
            for j in range(len(fileCSV)):

                if i == j:
                    result = 0.0
                    self.addEdge(i, j, result)

                elif self.mat_adj[i][j] == 0:
                    result = math.sqrt((
                        (float(fileCSV['valence'][i]) - (float(fileCSV['valence'][j]))) ** 2)
                        + ((float(fileCSV['acousticness'][i]) -
                            (float(fileCSV['acousticness'][j]))) ** 2)
                        + ((float(fileCSV['danceability'][i]) -
                            (float(fileCSV['danceability'][j]))) ** 2)
                        + ((float(fileCSV['energy'][i]) -
                            (float(fileCSV['energy'][j]))) ** 2)
                        + ((float(fileCSV['instrumentalness'][i]) -
                            (float(fileCSV['instrumentalness'][j]))) ** 2)
                        + ((float(fileCSV['liveness'][i]) -
                            (float(fileCSV['liveness'][j]))) ** 2)
                        + ((float(fileCSV['speechiness'][i]) -
                            (float(fileCSV['speechiness'][j]))) ** 2))

                    self.addEdge(i, j, result)
                    self.addEdge(j, i, result)

        self.writeTxt(fileTXT, len(fileCSV))

    def writeTxt(self, file, tam):

        for i in range(tam):
            for j in range(tam):
                file.write(str(self.mat_adj[i][j]) + "\n")

        file.close()

    def retorna_nomes_semelhantes(self, nameFile):

        resultadoSemelhantesFile = open("resultadoSemelhantes.txt", "r")

        self.list_posicao_semelhantes = resultadoSemelhantesFile.readlines()

        try:
            fileCSV = pd.read_csv(nameFile, sep=';', encoding='utf-8')

            for i in range(len(self.list_posicao_semelhantes)):

                aux = sum(int(x)
                          for x in self.list_posicao_semelhantes[i] if x.isdigit())

                self.list_json.append(
                    {
                        "id": int(self.list_posicao_semelhantes[i]) + 1,
                        "name": fileCSV['nome'][int(self.list_posicao_semelhantes[i])],
                        "uri": fileCSV['uri'][int(self.list_posicao_semelhantes[i])],
                        "valence": fileCSV['valence'][int(self.list_posicao_semelhantes[i])],
                        "acousticness": fileCSV['acousticness'][int(self.list_posicao_semelhantes[i])],
                        "danceability": fileCSV['danceability'][int(self.list_posicao_semelhantes[i])],
                        "energy": fileCSV['energy'][int(self.list_posicao_semelhantes[i])],
                        "instrumentalness": fileCSV['instrumentalness'][int(self.list_posicao_semelhantes[i])],
                        "liveness": fileCSV['liveness'][int(self.list_posicao_semelhantes[i])],
                        "speechiness": fileCSV['speechiness'][int(self.list_posicao_semelhantes[i])],
                        "flagErr": "false",
                        "urlImg": fileCSV['image'][int(self.list_posicao_semelhantes[i])],
                        "urlMusic": fileCSV['url'][int(self.list_posicao_semelhantes[i])],
                        "albumName": fileCSV['album'][int(self.list_posicao_semelhantes[i])]
                    }
                )

            return self.list_json

        except:
            print("Erro ao ler arquivo CSV.")

    def run(self, nameFIle):
        self.firstStep(self.readFile(nameFIle))
        print("Subtraindo arquivos...")
