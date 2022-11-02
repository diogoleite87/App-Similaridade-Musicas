import subprocess
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bodyModels import RatingDTO
import database
from data import subtrai_variaveis
from makeMtz import MakeMtz

flagGlobalQueue: bool = True

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = database.RequestsDB()


@app.get('/')
def index():
    return {"Msg": "go to /docs for the API documentation"}


@app.get("/search/{id_playlist}/{num_musicas}/{num_semelhantes}/{valence}/{acousticness}/{danceability}/{energy}/{"
         "instrumentalness}/{liveness}/{speechiness}/{customBand}/{nameCustomBand}/{artistCustomBand}")
def run(id_playlist: str, num_musicas: str, num_semelhantes: str,
        valence: float, acousticness: float, danceability: float,
        energy: float, instrumentalness: float, liveness: float,
        speechiness: float, customBand: bool, nameCustomBand: str, artistCustomBand: str):
    global flagGlobalQueue

    if flagGlobalQueue:

        flagGlobalQueue = False

        try:
            numMusicas = open("numMusicas.txt", "w")
            numSemelhantes = open("numSemelhantes.txt", "w")

            numMusicas.write(num_musicas)
            numSemelhantes.write(num_semelhantes)

            numMusicas.close()
            numSemelhantes.close()

            subtrai_variaveis(id_playlist, valence, acousticness, danceability, energy, instrumentalness, liveness,
                              speechiness, customBand, nameCustomBand, artistCustomBand)
            nameFile: str = "dadosMusicas.csv"
            result = MakeMtz()
            result.run(nameFile)

            subprocess.call(["mingw32-make", "clean"])
            subprocess.call(["mingw32-make", "all"])
            subprocess.call("./api-usage")

            list_json = result.retorna_nomes_semelhantes(nameFile)

            flagGlobalQueue = True

            return list_json
        except:

            flagGlobalQueue = True

            return [{
                "id": 0,
                "name": 0,
                "uri": 0,
                "valence": 0,
                "acousticness": 0,
                "danceability": 0,
                "energy": 0,
                "instrumentalness": 0,
                "liveness": 0,
                "speechiness": 0,
                "flagErr": False,
                "urlImg": "",
                "urlMusic": "",
                "albumName": ""

            }]

    else:
        return [{
            "id": 0,
            "name": 0,
            "uri": 0,
            "valence": 0,
            "acousticness": 0,
            "danceability": 0,
            "energy": 0,
            "instrumentalness": 0,
            "liveness": 0,
            "speechiness": 0,
            "flagErr": False,
            "urlImg": "",
            "urlMusic": "",
            "albumName": ""
        }]


@app.post('/rating')
async def insert(rating: RatingDTO):

    db.insertRating(rating)


@app.get('/login/admin/{email}/{password}')
def login(email: str, password: str):

    res = db.login(email, password)

    return res


@app.get('/rating/all/')
def ratingAll():

    res = db.getAllRating()

    return res


@app.put('/rating/verified/{email}/{verified}')
def updateRating(email: str, verified: bool):

    db.updateRating(email, verified)


@app.delete('/rating/{email}')
def deleteRating(email: str):

    db.deleteRating(email)


@app.get('/rating/all/verified')
def allRatingVerified():

    res = db.getAllRatingVerified()

    return res


@app.get('/rating/all/info')
def allRatingInfo():

    res = db.getAllRatingInfo()

    return res
