import Submission from '../database/Submission.js';
import Like from '../database/Like.js';

class SubmissionModel {

    static async create(name, hasBox, type, submitterID) {
        let sub = new Submission({
            submitterID: submitterID,
            name: name,
            hasBox: hasBox,
            type: this.convertTypeTextToNumber(type)
        });
        return await sub.save();
    }

    static async search(query){
        query = query.toLowerCase();
        let subs = await Submission.find()
            .populate('categoryID').populate('priceID')
            .populate({
                path: 'submitterID',
                populate: {path: 'role'}
            });
        for(let i = 0; i < subs.length; i++){
            let likeCount = await Like.countDocuments({itemID: subs[i]._id});
            subs[i].set('likes', likeCount, {strict: false});
        }
        subs = subs.filter(sub => {
            if(sub.categoryID !== undefined){
                return sub.name.toLowerCase().includes(query) || sub.categoryID.name.toLowerCase().includes(query)
            }else return sub.name.toLowerCase().includes(query)
        });
        return subs;
    }

    static async setDescription(id, description){
        let sub = await Submission.findById(id);
        sub.description = description;
        return await sub.save();
    }

    static async setInfo(id, infoObj){
        return await Submission.updateOne({_id: id}, {$set: infoObj});
    }

    static async get(id){
        let sub = await Submission.findById(id)
            .populate('categoryID').populate('priceID')
            .populate({
                path: 'submitterID',
                populate: {path: 'role'}
            });
        let likeCount = await Like.countDocuments({itemID: sub._id});
        sub.set('likes', likeCount, {strict: false});
        return sub;
    }

    static async find(conditions){
        return await Submission.find(conditions).populate('categoryID').populate('priceID');
    }
    
    static async findAmount(conditions, from, to, sort){
        let subs =  await Submission.find(conditions)
            .populate('categoryID').populate('priceID')
            .populate({
                path: 'submitterID',
                populate: {path: 'role'}
            }).sort(sort);
        for(let i = 0; i < subs.length; i++){
            let likeCount = await Like.countDocuments({itemID: subs[i]._id});
            subs[i].set('likes', likeCount, {strict: false});
        }
        return subs.slice(from, to);
    }

    static async findAmountByLikes(conditions, from, to, sort){
        let subs = await Submission.find(conditions)
            .populate('categoryID').populate('priceID')
            .populate({
                path: 'submitterID',
                populate: {path: 'role'}
            });
        for(let i = 0; i < subs.length; i++){
            let likeCount = await Like.countDocuments({itemID: subs[i]._id});
            subs[i].set('likes', likeCount, {strict: false});
        }
        subs = subs.sort((a, b) => {
            if(a._doc.likes >= b._doc.likes) {
                return (sort === 'desc') ? -1 : 1;
            }
            else return (sort === 'desc') ? 1 : -1;
        });
        return subs.slice(from, to);
    }

    static async delete(id){
        return await Submission.findByIdAndDelete(id);
    }

    static convertTypeTextToNumber(typeText){
        switch(typeText){
            case "2D": return 0;
            case "3D": return 1;
            case "2D+3D": return 2;
            default: return -1;
        }
    }

}

export default SubmissionModel;