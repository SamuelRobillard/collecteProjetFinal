import { ro } from "@faker-js/faker/.";

export default class DTOUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role : string;
    // Constructeur pour initialiser toutes les propriétés de la classe
    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        role : string
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role
    }
}