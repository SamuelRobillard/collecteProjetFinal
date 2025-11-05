
import { errorLogger } from "../../winston/winstonError";


export default class ValidationRegexV2 {

    
    static validerTitre(input: string): boolean {
        const regex = /.{1,200}$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Seuls les lettres, chiffres et espaces sont autorisés.");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }
    static validerPassword(input: string): boolean {
        input = this.cleanString(input)
        const regex =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Password : Entrez un minimum de 8 characteres dont une majuscule, un chiffre et un charactere special");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }
    static validerUsername(input: string): boolean {
        input = this.cleanString(input)
        const regex = /^[a-zA-Z0-9_]{3,30}$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Username doit avoir entre 3-30 charactere");
            error.status = 400;
            errorLogger.error((`Validation username échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

static validerNom(input: string): boolean {
        
        const regex = /^[a-zA-Z]+$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Nom doit seulement contenir des lettres");
            error.status = 400;
            errorLogger.error((`Validation nom échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

    static validerEmail(input: string): boolean {
        input = this.cleanString(input)
        const regex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/
;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("email invalide");
            error.status = 400;
            errorLogger.error((`Validation email échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }


static validerDurationMinMovie(input: string): boolean {
        const regex = /^(?:[1-9]|[1-9][0-9]|[1-5][0-9]{2}|600)$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("La duree doit etre de 1 a 600 minutes.");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }
static validerDurationMinEpisode(input: string): boolean {
        const regex = /^(?:[1-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("La duree doit etre de 1 a 300 minutes");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

static validerReview(input: string): boolean {
        const regex = /.{1,2000}$/;
        
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Seuls les lettres, chiffres et espaces sont autorisés.");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

    static validerGenre(input: string): boolean {
        const regex = /.{1,30}$/;

        if (regex.test(input)) {

            return true
        } else {
            const error: any = new Error("Seuls les lettres sont autorisés.");
            error.status = 400;

            errorLogger.error((`Validation plateforme échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

    static validerDuree(input: string): boolean {
        const regex = /^[0-9]+$/;

        if (regex.test(input) && input !== "0") {

            return true
        } else {
            const error: any = new Error("Seuls les chiffres positifs sont autorisés.");
            error.status = 400;
            errorLogger.error((`Validation duree échouée: ${error.message} error status : ${error.status}`))

            return false
        }
    }

    static validerStatus(input: string): boolean {
        const regex = /^(en_attente|en_cours|terminee)$/;

        if (regex.test(input)) {

            return true
        } else {
            const error: any = new Error("Seuls les status en_attente, en_cours et terminee sont autorisé.");
            error.status = 400;

            errorLogger.error((`Validation status échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }



    static cleanString(string: string): string {
        // supprime tout les espace et remplace en ' ' (un seul espace)
        // donc si ya "   " ca deveint " "

        const noSpace: RegExp = /\s+/g;
        return string.trim().replace(noSpace, ' ')

    }





}