
import { error } from "console";
import { Request,Response,NextFunction } from "express";


const dateRegex= /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/ ;
const numberOfRoomsRegex = /^[1-9]$/;


export function validateBookingDates(req:Request,res:Response,next:NextFunction) {
    const {dateStart,dateEnd} = req.body ||{};

    if(typeof dateStart !== 'string' || !dateRegex.test(dateStart)){
        return res.status(400).json({error:'Date de début invalide'})
    }

    if(typeof dateEnd != 'string' || !dateRegex.test(dateEnd)){
        return res.status(400).json({error:"Date de fin invalide."})
    }
    
    next();
}


export function validateNumberOfRooms(req:Request,res:Response,next:NextFunction){

    const {nbRooms} = req.body || {};

    if(typeof nbRooms !== 'number' || !numberOfRoomsRegex.test(String(nbRooms))){

        return res.status(400).json({error:"Nombre de chambre invalide"})
    }

  next();
}

