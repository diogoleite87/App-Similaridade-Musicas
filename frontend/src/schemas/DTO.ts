export interface SearchDTO {
    uri: string,
    numberOfSongs: number,
    numberOfMusicGroup: number,
    valence: number,
    acousticness: number,
    danceability: number,
    energy: number,
    instrumentalness: number,
    liveness: number,
    speechiness: number,
    customBand: boolean,
    nameCustomBand: string,
    artistCustomBand: string
}

export interface RatingDTO {
    email: string,
    name: string,
    ratingOne: number,
    ratingTwo: number,
    ratingThree: number,
    ratingFour: number,
    ratingDate: string,
    ratingText: string,
}