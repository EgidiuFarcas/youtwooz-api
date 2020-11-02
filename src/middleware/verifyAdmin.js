import UserModel from '../models/UserModel.js';

export default async function (req, res, next){
    if(!req.userID) return res.status(401).send('Access Denied');
    let user = await UserModel.findByID(req.userID);
    if(!user) return res.status(400).send("User not found");
    console.log(user.role._id, process.env.ADMIN_ROLE_ID)
    if(String(user.role._id).localeCompare(process.env.ADMIN_ROLE_ID) !== 0) return res.status(401).send('Access Denied Admin');
    req.user = user;
    next();
}