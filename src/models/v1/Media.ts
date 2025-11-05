

export default abstract class Media {

  abstract type: string
  id: string;
  titre: string;
  genre: string;
  year: Number;
  rating: Number;

  constructor(id: string, titre: string, genre: string, year: Number, rating: Number) {

    this.id = id;
    this.titre = titre;
    this.genre = genre;
    this.year = year;
    this.rating = rating

  }

  // Méthode abstraite à implémenter dans les classes enfants
  abstract getSummary(): string;
}