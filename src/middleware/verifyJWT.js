import jwt from 'jsonwebtoken';

export default function (req, res, next){
    let token = req.header('Authorization');
    if(!token) return res.status(402).send('Access denied');
    try{
        let verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userID = verified.id;
    }catch(err){
        return res.status(400).send('Invalid Token');
    }
    next();
}