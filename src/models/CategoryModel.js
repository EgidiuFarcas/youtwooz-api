import Category from '../database/Category.js';

export default class CategoryModel {

    static async create(name){
        let categoryModel = new Category({
            name: name,
        });
        return await categoryModel.save();
    }

    static async getAll(){
        return await Category.find();
    }

    static async findID(id){
        return await Category.findById(id);
    }

    static async existsValue(name){
        let categoryModel = await Category.findOne({name: name});
        if(!categoryModel) return false;
        return categoryModel;
    }

    static async existsID(id){
        let categoryModel = await Category.findOne({_id: id});
        if(!categoryModel) return false;
        return categoryModel;
    }

    static async delete(id){
        return await Category.findOneAndDelete({_id: id});
    }

}