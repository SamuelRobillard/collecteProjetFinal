
import CityCodeName, { ICityCodeName } from "../../models/v3/CityCodeNameModel";
import FormatedStringRegex from "../../Regex/FormatedStringRegex";


export class CityCodeNameService {


  
  public static async createCityCodeName(cityCode: string, cityName: string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    
    const cityCodeName = new CityCodeName({
       cityCode,
       cityName,
       

     
    });

    // Sauvegarder l'utilisateur dans la base de données
    try{
        const codeAlreadyExist = await CityCodeName.findOne({
            cityCode : cityCode
        });
        
        if(codeAlreadyExist != null){
            return  { message: `code :  ${cityCode} already exists` };
        }
        
        else{
            await cityCodeName.save();
            return { cityCodeName: cityCodeName };
        }
            
    }
    catch (error) {
        throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
      }
    
    
   
  }



  public static async getAllCityCodeName(): Promise<ICityCodeName[]> {
    try {
      const cityCodeName = await CityCodeName.find();
    
      return cityCodeName;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des citycCodeName: ' + error);
    }
  }
  public static async getAllUniqueCityName(): Promise<string[] | null> {
  try {
    const cityNames = await CityCodeName.find().select("cityName -_id");

    if (!cityNames || cityNames.length === 0) {
      return null;
    }

    // Extract all names
    const names = cityNames.map(c => c.cityName);

    // Remove duplicates with a Set
    const uniqueNames = [...new Set(names)];

    return uniqueNames;

  } catch (error) {
    throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
  }
}



  public static async getCityNameByItsCode(cityCode : string): Promise<string | null> {
    try {
        cityCode = FormatedStringRegex.formatedString(cityCode)
        const cityCodeName = await CityCodeName.findOne({cityCode : cityCode});
        if(cityCodeName != null){
            return cityCodeName.cityName;
        }
        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }


  public static async getCityCodeByItsName(cityName : string): Promise<string[] | null> {
    try {
        cityName = FormatedStringRegex.formatedString(cityName)

        console.log("im here"  + cityName)
        const cityCodeNames = await CityCodeName.find({cityName : cityName});
        if (cityCodeNames && cityCodeNames.length > 0) {
            const allCodes = cityCodeNames.map((element) => element.cityCode); // Utilisation de map pour créer un tableau de cityCode
            return allCodes;
          }
        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }


    public static async getAllCityName(): Promise<string[] | null> {
    try {
        

       
        const cityCodeNames = await CityCodeName.distinct("cityName");
        console.log(cityCodeNames);
        return cityCodeNames;
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }



}