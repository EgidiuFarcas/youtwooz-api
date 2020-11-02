import Entities from 'html-entities';
import CommentModel from '../models/CommentModel.js';
const entities = new Entities.AllHtmlEntities();

class CommentController {
    static async new(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.itemID) return res.status(400).send('Missing item id');
        if(!req.body.text) return res.status(400).send('Missing text');
        req.body.text = entities.encodeNonUTF(req.body.text);
        let comment = await CommentModel.create(req.userID, req.body.itemID, req.body.text);
        res.send(comment);
    }

    static async get(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let comment = await CommentModel.existsValue(req.userID, req.body.itemID);
        if(comment === false) return res.send('false');
        res.send('true');
    }

    static async delete(req, res){
        if(!req.userID) return res.status(400).send('Missing user id');
        if(!req.body.commentID) return res.status(400).send('Missing comment id');

        let comment = await CommentModel.existsID(req.body.commentID);
        if(comment === false) return res.status(404).send('Comment not found.');

        await CommentModel.delete(comment._id);
        res.send("Deleted.");
    }

    static async getCount(req, res){
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let comments = await CommentModel.findForItem(req.body.itemID);
        return res.send({comments: comments.length});
    }

    static async getAllForItem(req, res){
        if(!req.body.itemID) return res.status(400).send('Missing item id');

        let comments = await CommentModel.findForItem(req.body.itemID);
        return res.send({comments: comments});
    }
}

export default CommentController;