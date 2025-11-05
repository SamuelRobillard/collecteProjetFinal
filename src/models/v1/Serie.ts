import Media from "./Media"



export default class Serie extends Media {
  type: string
  status: string
  saisonsId: String[]
  constructor(id: string, titre: string, genre: string, year: number, rating: number, status: string, saisonsId: String[]) {
    super(id, titre, genre, year, rating);
    this.type = "serie"
    this.status = status;
    this.saisonsId = saisonsId;
  }

  getSummary(): string {


    return Serie.toString()
  }
}