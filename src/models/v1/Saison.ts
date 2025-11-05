

export default class Saison {
    id: string;
    seasonNumber: Number;
    releaseDate: Date;
    episodesId: String[]

    constructor(id: string, seasonNumber: Number, realeaseDate: Date, episodesId: String[]) {
        this.id = id;
        this.seasonNumber = seasonNumber;
        this.releaseDate = realeaseDate;
        this.episodesId = episodesId;
    }
}