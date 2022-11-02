export type Music = {
    id: number,
    name: string,
    uri: string,
    valence: string,
    acousticness: string,
    danceability: string,
    energy: string,
    instrumentalness: string,
    liveness: string,
    speechiness: string,
    flagErr: boolean,
    urlImg: string,
    urlMusic: string,
    albumName: string
}

export type RatingType = {
    email: string,
    name: string,
    ratingOne: number,
    ratingTwo: number,
    ratingThree: number,
    ratingFour: number,
    ratingDate: Date,
    ratingText: string,
    verified: boolean
}

export type RatingPublicType = {
    name: string,
    ratingOne: number,
    ratingTwo: number,
    ratingThree: number,
    ratingFour: number,
    ratingDate: Date,
    ratingText: string,
}

export type RatingAllStats = {
    totalRating: number,
    numberRatingVerified: number,
    numberRatingNotVerified: number,
    averageRating: number
}