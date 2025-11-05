import Media from "../v1/Media"

export default class Film extends Media {
    type: string
    duration: Number
    watched: boolean
    constructor(id: string, titre: string, genre: string, year: Number, rating: Number, duaration: Number, watched: boolean) {

        super(id, titre, genre, year, rating)
        this.type = "film"
        this.duration = duaration;
        this.watched = watched;
    }
    getSummary(): string {
        return Film.toString()
    }
}