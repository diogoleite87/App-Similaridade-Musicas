from sqlite3 import Date
from tokenize import Double
from pydantic import BaseModel


class RatingDTO(BaseModel):
    email: str
    name: str
    ratingOne: float
    ratingTwo: float
    ratingThree: float
    ratingFour: float
    ratingDate: Date
    ratingText: str


class Search(BaseModel):
    uri: str
    numberOfSongs: float
    numberOfMusicGroup: float
    valence: float
    acousticness: float
    danceability: float
    energy: float
    instrumentalness: float
    liveness: float
    speechiness: float
    customBand: bool
    nameCustomBand: str
    artistCustomBand: str
