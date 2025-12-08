
export default class FormatedStringRegex {



    static removeMultipleSpace(string: string): string {
        // supprime tout les espace et remplace en ' ' (un seul espace)
        // donc si ya "   " ca deveint " "

        const noSpace: RegExp = /\s+/g;
        return string.trim().replace(noSpace, ' ')

    }
    static lowerCase(string: string): string {
    

        return string.toLowerCase();
        


    }

    static removeAccents(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
   


    // met en lower case, enleve les accent et les espace debut et fin et espace multiple
    static formatedString(string: string): string {
    
     const lowerCase = this.lowerCase(string)
     const noSpace = this.removeMultipleSpace(lowerCase)
     const noAccent = this.removeAccents(noSpace)
     return noAccent
        


    }

    static isTestInName(string: string): boolean {
        const regex = /test/gi;  
        return regex.test(string);   
    }
    
    

}