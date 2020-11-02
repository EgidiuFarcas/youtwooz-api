import Comment from '../database/Comment.js';
import Like from '../database/Like.js';

export default class CommentModel {

    static async create(userID, itemID, text){
        let commentModel = new Comment({
            userID: userID,
            itemID: itemID,
            text: text
        });
        return await commentModel.save();
    }

    static async getAll(){
        return await Comment.find().populate({
            path: 'userID',
            populate: {path: 'role'}
        });
    }

    static async findForItem(itemID){
        let cmts = await Comment.find({itemID: itemID})
        .populate({
            path: 'userID',
            populate: {path: 'role'}
        });
        for(let i = 0; i < cmts.length; i++){
            let likeCount = await Like.countDocuments({itemID: cmts[i]._id});
            cmts[i].set('likes', likeCount, {strict: false});
        }
        return cmts;
    }

    static async existsValue(userID, itemID){
        let commentModel = await Comment.findOne({userID: userID, itemID: itemID});
        if(!commentModel) return false;
        return commentModel;
    }

    static async existsID(id){
        let commentModel = await Comment.findOne({_id: id});
        if(!commentModel) return false;
        return commentModel;
    }

    static async delete(id){
        return await Comment.findOneAndDelete({_id: id});
    }

    static async deleteValue(userID, itemID){
        return await Comment.findOneAndDelete({userID: userID, itemID: itemID});
    }

}