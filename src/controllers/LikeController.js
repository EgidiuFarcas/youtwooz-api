import LikeModel from '../models/LikeModel.js';

class LikeController {
    static async new(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let like = await LikeModel.create(req.userID, req.body.itemID);
        res.send(like);
    }

    static async get(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let like = await LikeModel.existsValue(req.userID, req.body.itemID);
        if(like === false) return res.send('false');
        res.send('true');
    }

    static async delete(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let like = await LikeModel.existsValue(req.userID, req.body.itemID);
        if(like === false) return res.status(404).send('Like not found.');

        await LikeModel.delete(like._id);
        res.send("Deleted.");
    }

    static async getCount(req, res){
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let likes = await LikeModel.findForItem(req.body.itemID);
        return res.send({likes: likes.length});
    }
}

export default LikeController;