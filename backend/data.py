import spotipy
import dotenv
import os
import pandas as pd
from spotipy.oauth2 import SpotifyClientCredentials


def subtrai_variaveis(id_playlist: str, valence: float, acousticness: float, danceability: float, energy: float,
                      instrumentalness: float, liveness: float, speechiness: float, customBand: bool,
                      nameCustomBand: str, artistCustomBand: str):
    dotenv.load_dotenv(dotenv.find_dotenv())

    client_credentials_manager = SpotifyClientCredentials(
        client_id=os.getenv("CLIENT_ID"), client_secret=os.getenv("CLIENT_SECRET"))
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    results = sp.playlist_items(id_playlist)

    tids = []
    names = []
    img: str = []
    url: str = []
    albumName: str = []

    for i, t in enumerate(results['items']):
        names.append(t['track']['name'])
        tids.append(t['track']['uri'])
        img.append(t['track']['album']['images'][0]['url'])
        url.append(t['track']['external_urls']['spotify'])
        albumName.append(t['track']['album']['name'])


    tracks = sp.audio_features(tids)

    features_list = []

    if customBand:
        features_list.append([nameCustomBand, valence, acousticness, danceability, energy, instrumentalness, liveness,
                             speechiness, "#", "https://zenitemarcas.com.br/wp-content/uploads/2018/05/como-registrar-uma-m%C3%BAsica.jpg","#", artistCustomBand])

    for i, t in enumerate(tracks):
        features_list.append([names[i], tracks[i]['valence'], tracks[i]['acousticness'],
                              tracks[i]['danceability'], tracks[i]['energy'],
                              tracks[i]['instrumentalness'], tracks[i]['liveness'],
                              tracks[i]['speechiness'], tracks[i]['uri'], img[i], url[i], albumName[i]])

    df = pd.DataFrame(features_list, columns=['nome', 'valence', 'acousticness',
                                              'danceability', 'energy',
                                              'instrumentalness', 'liveness',
                                              'speechiness', 'uri', 'image', 'url', 'album'])

    df.to_csv('dadosMusicas.csv',
              index=False, decimal=".", sep=";")
    # df.to_csv('dados_musicas_{}.csv'.format(playlist_id), index=False, decimal = ".", sep = ",")
