export default class DTOUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;

    // Constructeur pour initialiser toutes les propriétés de la classe
    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        email: string
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}