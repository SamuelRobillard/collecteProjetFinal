export default class DataTransferHotelInfo {
    hotel: string;
    name: string;
    country: string;
    city : string;
    rating: number;
    nbRating: number;
    price: number;
    ratioPriceQuality: number;

    // Constructeur pour initialiser toutes les propriétés de la classe
    constructor(
        hotel: string,
        name: string,
        country: string,
        city : string,
        rating: number,
        nbRating: number,
        price: number,
        ratioPriceQuality: number
    ) {
        this.hotel = hotel;
        this.name = name;
        this.country = country;
        this.city = city;
        this.rating = rating;
        this.nbRating = nbRating;
        this.price = price;
        this.ratioPriceQuality = ratioPriceQuality;
    }
}