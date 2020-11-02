import Price from '../database/Price.js';

export default class PriceModel {

    static async create(price){
        let priceModel = new Price({
            amount: price,
        });
        return await priceModel.save();
    }

    static async getAll(){
        return await Price.find();
    }

    static async findID(id){
        return await Price.findById(id);
    }

    static async existsValue(price){
        let priceModel = await Price.findOne({amount: price});
        if(!priceModel) return false;
        return priceModel;
    }

    static async existsID(id){
        let priceModel = await Price.findOne({_id: id});
        if(!priceModel) return false;
        return priceModel;
    }

    static async delete(id){
        return await Price.findOneAndDelete({_id: id});
    }

}