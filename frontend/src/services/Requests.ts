import { Api } from "../providers";
import { Music, RatingType, RatingPublicType, RatingAllStats, RatingDTO } from "../schemas";

const getBestSolution = (
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
    artistCustomBand: string) => Api.get<Music[]>(`search/${uri}/${numberOfSongs}/${numberOfMusicGroup}/${valence}/${acousticness}/${danceability}/${energy}/${instrumentalness}/${liveness}/${speechiness}/${customBand}/${nameCustomBand}/${artistCustomBand}`)

const getAllRating = () => Api.get<RatingType[]>(`rating/all/`)

const getAllRatingVerified = () => Api.get<RatingPublicType[]>(`rating/all/verified`)

const getAdminLogin = (email: string, password: string) => Api.get(`login/admin/${email}/${password}`)

const getAllRatingInfo = () => Api.get(`rating/all/info`)

const postRating = (rating: RatingDTO) => Api.post('rating/', JSON.stringify(rating))

const putVerifiedRating = (email: string, verified: boolean) => Api.put(`rating/verified/${email}/${verified}`)
const deleteRating = (email: string) => Api.delete(`rating/${email}`)

export const Requests = {
    getBestSolution,
    getAllRating,
    getAllRatingVerified,
    getAllRatingInfo,
    putVerifiedRating,
    deleteRating,
    getAdminLogin,
    postRating,
}