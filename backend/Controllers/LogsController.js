import Log from "../models/LogsModel.js";
import Permissions from "../models/Permissions.js"
export const GetLogs= async(req, res) =>{
    try {
        const response = await Log.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const GetPermissionsView= async(req, res) =>{
    try {
        const response = await Permissions.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}