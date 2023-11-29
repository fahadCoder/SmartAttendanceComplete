import Coordinator from "../models/CoordinatorModel.js";



export const createCoordinator = async(req, res) =>{
    try {
        await Coordinator.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}