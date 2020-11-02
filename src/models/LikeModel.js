import Like from '../database/Like.js';

export default class LikeModel {

    static async create(userID, itemID){
        let likeModel = new Like({
            userID: userID,
            itemID: itemID
        });
        return await likeModel.save();
    }

    static async getAll(){
        return await Like.find();
    }

    static async findForItem(itemID){
        return await Like.find({itemID: itemID});
    }

    static async existsValue(userID, itemID){
        let likeModel = await Like.findOne({userID: userID, itemID: itemID});
        if(!likeModel) return false;
        return likeModel;
    }

    static async existsID(id){
        let categoryModel = await Like.findOne({_id: id});
        if(!categoryModel) return false;
        return categoryModel;
    }

    static async delete(id){
        return await Like.findOneAndDelete({_id: id});
    }

    static async deleteValue(userID, itemID){
        return await Like.findOneAndDelete({userID: userID, itemID: itemID});
    }

}