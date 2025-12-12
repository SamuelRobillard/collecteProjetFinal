export default class DTOBooking {
    hotelId: string;
    name: string;
    country: string;
    city : string;
    startDate : string;
    endDate : string;
    totalPrice : number;
    
    
   
   

    // Constructeur pour initialiser toutes les propriétés de la classe
    constructor(
        hotelId: string,
        name: string,
        country: string,
        city : string,
        startDate : string,
        endDate : string,
        totalPrice : number,
       
       
    ) {
        this.hotelId = hotelId;
        this.name = name;
        this.country = country;
        this.city = city;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
       
    }
}